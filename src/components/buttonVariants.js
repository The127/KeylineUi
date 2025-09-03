
const variants = {
    intent: {
        primary: [
            "border-slate-900",
            "bg-slate-900",
            "hover:bg-transparent",
            "text-slate-100",
            "hover:text-slate-900",
            "hover:inset-shadow-xs",
        ],
        secondary: [
            "bg-transparent",
            "border-slate-500",
            "text-slate-500",
            "hover:text-slate-100",
            "hover:bg-slate-500",
            "hover:inset-shadow-xs",
        ],
        danger: [
            "bg-transparent",
            "border-red-700",
            "text-red-700",
            "hover:text-slate-100",
            "hover:bg-red-700",
            "hover:inset-shadow-xs",
        ],
        link: [
            "bg-transparent",
            "text-emerald-500",
            "hover:text-emerald-600",
            "underline",
            "hover:no-underline",
            "border-none",
        ],
        special: [
            "bg-gradient-to-r",
            "from-emerald-500", "to-teal-500",
            "hover:via-emerald-400", "via-teal-500",
            "hover:from-emerald-400", "to-teal-400",
            "text-slate-100",
            "hover:text-slate-50",
            "tracking-wider",
            "uppercase",
            "border-none",
            "hover:inset-shadow-xs",
        ]
    },
    size: {
        inline: [
            "rounded-sm",
            "border-1",
        ],
        sm: [
            "px-2",
            "py-1",
            "rounded-md",
            "border-1",
        ],
        md: [
            "px-3",
            "py-2",
            "rounded-md",
            "border-1",
        ],
        lg: [
            "px-5",
            "py-3",
            "rounded-md",
            "border-1",
        ],
    },
}

export default variants