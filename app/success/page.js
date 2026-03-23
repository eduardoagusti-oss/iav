import dynamic from "next/dynamic"
import { Suspense } from "react"

const SuccessClient = dynamic(() => import("./SuccessClient"), {
ssr: false,
})

export default function Page() {
return (
<Suspense fallback={<div className="text-white p-10">Cargando...</div>}> <SuccessClient /> </Suspense>
)
}
