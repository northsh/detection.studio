import type { VariantProps } from "class-variance-authority";

import { cva } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive:
                    "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline:
                    "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/20 dark:border-input dark:hover:bg-input/50",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                link: "text-primary underline-offset-4 hover:underline",
                "primary-pixel-perfect":
                    "shadow-md border-[0.5px] border-white/25 shadow-black/20 [&_svg]:drop-shadow-sm not-in-data-[theme=dark]:text-shadow-sm bg-primary ring-1 ring-(--ring-color) [--ring-color:color-mix(in_oklab,var(--color-foreground)15%,var(--color-primary))] text-primary-foreground hover:bg-primary/90",
                marketing:
                    "bg-gradient-to-t from-[#6367bd] to-[#8585d6] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.1),0_10px_30px_-10px_rgb(130_130_249_/_0.6)] hover:brightness-110",
                "marketing-ghost":
                    "marketing-ghost-btn relative bg-white/[0.04] text-foreground shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.25),inset_1px_0_0_0_rgb(255_255_255_/_0.15),inset_0_-1px_0_0_rgb(255_255_255_/_0.1),inset_-1px_0_0_0_rgb(255_255_255_/_0.06)] transition-all duration-300 hover:shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.4),inset_1px_0_0_0_rgb(255_255_255_/_0.25),inset_0_-1px_0_0_rgb(255_255_255_/_0.15),inset_-1px_0_0_0_rgb(255_255_255_/_0.08)]",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                marketing: "h-11 rounded-full px-[18px] text-sm has-[>svg]:pr-4",
                icon: "size-9",
                "icon-sm": "size-8",
                "icon-lg": "size-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);
export type ButtonVariants = VariantProps<typeof buttonVariants>;
