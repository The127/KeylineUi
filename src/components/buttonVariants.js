
const variants = {
    intent: {
        primary: [
            "bg-emerald-500",
            "hover:bg-emerald-600",
            "text-slate-100",
        ],
        secondary: [
            "border-3",
            "border-slate-700",
            "hover:text-slate-100",
            "hover:bg-slate-700",
        ],
        danger: [
            "border-3",
            "border-red-700",
            "hover:text-slate-100",
            "hover:bg-red-700",
        ],
        link: [
            "text-emerald-500",
            "hover:text-emerald-600",
            "underline",
            "hover:no-underline",
        ],
        special: [
            "bg-gradient-to-r",
            "from-emerald-500", "to-teal-500",
            "hover:from-emerald-400", "to-teal-400",
            "text-slate-100",
            "hover:text-slate-50",
            "tracking-wider",
            "uppercase",
        ]
    },
    size: {
        inline: [
            "rounded-sm",
        ],
        sm: [
            "px-2",
            "py-1",
            "rounded-md",
        ],
        md: [
            "px-3",
            "py-2",
            "rounded-md",
        ],
        lg: [
            "px-5",
            "py-3",
            "rounded-md",
        ],
    },
}

export default variants