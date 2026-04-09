import React from "react"
import { LogIn } from 'lucide-react';

interface SignInButtonProps {
    handleClick: VoidFunction
}

export default function SignInButton({ handleClick }: SignInButtonProps) {
    return (
        <div className="mt-4 border-t border-white/8 pt-4">
            <button
                type="button"
                onClick={handleClick}
                className="flex w-full items-center justify-center space-x-3 rounded-lg border border-white/15 bg-transparent px-3 py-2 text-white/90 transition-all duration-200 hover:border-white/25 hover:bg-white/6 hover:text-white"
            >
                <LogIn className="h-5 w-5" />
                <span className="uppercase">Entrar</span>
            </button>
        </div>
    )
}

