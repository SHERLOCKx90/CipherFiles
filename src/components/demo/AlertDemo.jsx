import { Terminal } from "lucide-react"
import { Sparkles } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"


export function AlertDemo({ title, desc }) {
    const Header = title === 'Hey!' ? <ShieldCheck className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />;

    return (
        <Alert className='w-[400px] mt-10 shadow-xl border-none'>
            {Header}
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription className="text-gray-600">
                {desc}
            </AlertDescription>
        </Alert>
    )
}
