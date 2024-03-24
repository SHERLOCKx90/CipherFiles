import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TableDemo } from "./TableDemo"

export function TableCard() {
    return (
        <Card className="w-[450px] lg:w-fit">
            <CardHeader>
                <CardTitle>My Files</CardTitle>
                <CardDescription>keep and view your saved files present in the database.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-y-scroll"><TableDemo /></div>
            </CardContent>
        </Card>
    )
}
