import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { analyzeFood } from "@/lib/ai/analyze-food";
import { AnalyzeFoodError } from "@/lib/ai/types";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Tenés que iniciar sesión." }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "No pudimos leer la imagen enviada." }, { status: 400 });
  }

  const file = formData.get("image");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No se recibió ninguna imagen." }, { status: 400 });
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Formato de imagen no soportado. Usá JPEG, PNG o WEBP." },
      { status: 400 }
    );
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json(
      { error: "La imagen es demasiado grande. Probá con una foto más liviana." },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await analyzeFood({
      base64: buffer.toString("base64"),
      mimeType: file.type,
    });
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof AnalyzeFoodError) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    console.error("[POST /api/analyze-food]", error);
    return NextResponse.json(
      { error: "Ocurrió un error inesperado al analizar la imagen." },
      { status: 500 }
    );
  }
}
