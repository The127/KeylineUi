export const templateTypes = [
    {
        type: "email_verification",
        title: "Email Verification",
        subtitle: "Send when an email verification is requested.",
    },
]

export const getTemplateInfo = (type) => {
    return templateTypes.find(t => t.type === type)
}