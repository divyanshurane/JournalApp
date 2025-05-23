export default function Header(){
    return(
        <div className="fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm">
            <div className="flex gap-8">
                <p className="text-lg font-semibold text-amber-800 hover:text-amber-600 cursor-pointer transition-colors">Home</p>
                <p className="text-lg text-amber-800 hover:text-amber-600 cursor-pointer transition-colors">New Entry</p>
                <p className="text-lg text-amber-800 hover:text-amber-600 cursor-pointer transition-colors">Journal</p>
                <p className="text-lg text-amber-800 hover:text-amber-600 cursor-pointer transition-colors">Profile</p>
            </div>
        </div>
    )
}