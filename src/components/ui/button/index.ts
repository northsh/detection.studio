import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
            "bg-primary text-primary-foreground hover:bg-primary/80 dark:shadow-[0_2px_2px_1px_rgba(0,0,0,0.2)] border dark:border-white/20 border-black/20",
        destructive:
            "bg-destructive text-destructive-foreground hover:bg-destructive/90 border dark:border-white/30 border-black/10",
        outline:
            "border border-input bg-background hover:bg-secondary hover:text-accent-foreground shadow-[0_1px_1px_0px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_4px_0px_rgba(0,0,0,0.1)]",
        secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:shadow-[0_2px_2px_1px_rgba(0,0,0,0.2)] shadow-[0_2px_2px_1px_rgba(0,0,0,0.02)] border dark:border-white/5 border-primary/15",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: 'h-9 px-4 py-2',
        xs: 'h-7 rounded px-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
