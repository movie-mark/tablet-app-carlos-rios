export type MakeWebhookResponse = {
  success: boolean
  message?: string
  error?: string
}

export async function sendToMakeWebhook(
  data: unknown,
  webhookUrl?: string
): Promise<MakeWebhookResponse> {
  const url = webhookUrl || process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL

  if (!url) {
    return {
      success: false,
      error: "URL del webhook no configurada. Por favor, configura NEXT_PUBLIC_MAKE_WEBHOOK_URL en las variables de entorno.",
    }
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return {
        success: false,
        error: `Error del servidor: ${response.status} - ${errorText}`,
      }
    }

    const responseData = await response.json().catch(() => ({}))
    return {
      success: true,
      message: "Datos enviados correctamente",
      ...responseData,
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? `Error de conexión: ${error.message}`
          : "Error desconocido al enviar los datos",
    }
  }
}

