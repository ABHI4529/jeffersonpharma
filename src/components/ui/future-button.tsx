import React, {useState} from "react";
import {Button, buttonVariants} from "./button";
import {AiOutlineLoading} from "react-icons/ai";
import type {VariantProps} from "class-variance-authority";

interface Props  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>{
    className?: string;
    onClick?: () => Promise<void>;
    children?: React.ReactNode;
    disabled?: boolean;
}

export default function FutureButton({
                                         className = "",
                                         onClick,
                                         children,
                                         disabled,
                                         ...props
                                     }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        if (onClick) {
            setIsLoading(true);
            try {
                await onClick();
            } catch (error) {
                console.error("Error occurred during future execution", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Button
            className={className}
            onClick={handleClick}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? <AiOutlineLoading className={"animate-spin"}/> : children}
        </Button>
    );
}
