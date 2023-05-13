module.exports = {
    "/api/v1/sample": {
        post: {
            operationId: "sampleDocs",
            summary: "Sample documentation",
            produces: [
                "application/json"
            ],
            security: [{ Bearer: [] }],
            parameters: [
                {
                    name: "body",
                    in: "body",
                    description: "Body request params.",
                    type: "string",
                    schema: {
                        "$ref": "#/definitions/SampleParams",
                    }
                },
            ],
            responses: {
                201: {
                    description: "Submit sample berhasil",
                    examples: {
                        "application/json": JSON.stringify({
                            success: true,
                            message: "Submit sample success",
                            messageTitle: null,
                            data: {
                                version: "v1",
                            },
                            responseTime: "0 ms.",
                        })
                    }
                },
                400: {
                    description: "Submit sample gagal karena validasi",
                    examples: {
                        "application/json": JSON.stringify({
                            success: false,
                            message: "Submit application failed",
                            messageTitle: null,
                            data: {
                                platform: [
                                    "Platform tidak boleh kosong."
                                ],
                            },
                            responseTime: "0 ms.",
                        })
                    }
                },
                404: {
                    description: "Submit sample gagal karena referensi data tidak ditemukan",
                    examples: {
                        "application/json": JSON.stringify({
                            success: false,
                            message: "Aplikasi pengajuan tidak ditemukan",
                            messageTitle: null,
                            data: null,
                            responseTime: "0 ms.",
                        })
                    }
                },
                401: {
                    $ref: '#/components/responses/UnauthorizedError'
                },
            }
        }
    },
}
