import Link from "next/link";

export default function Home() {
    return (
        <div className="max-w-screen-2xl mx-auto flex justify-center items-center h-screen bg-gradient-to-br from-[#F8CCFB] to-[#ACD2FD]">
            <div className="flex flex-col justify-center items-center h-14 gap-2">
                <h1 className="text-2xl text-black font-bold">
                    Get Ready To Dive into NextJS....
                </h1>
                <p className="text-sm text-pink-600 font-semibold mb-4">
                    This is a Test Project on Redux with RTK.
                </p>
                <Link href="/dbook">
                    <span className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition">
                        Go to Book Store
                    </span>
                </Link>
            </div>
        </div>
    );
}
