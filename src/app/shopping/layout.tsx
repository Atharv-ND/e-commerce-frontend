import Navbar from "@/components/navbar"

export default function shoppingLayout({children} : { children: React.ReactNode}){
    return <div>
        <Navbar></Navbar>
        {children}
    </div>
}