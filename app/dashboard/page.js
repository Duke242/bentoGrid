import ButtonAccount from "@/components/ButtonAccount"
import Subscribe from "@/components/Subscribe"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import BentoGrid from "@/components/BentoGrid"
import Image from "next/image"
import logo from "@/app/icon.png"

export const dynamic = "force-dynamic"

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  try {
    // const supabase = createServerComponentClient({ cookies })

    // const {
    //   data: { session },
    // } = await supabase.auth.getSession()

    // const { data: profiles, error } = await supabase
    //   .from("profiles")
    //   .select("has_access")
    //   .eq("id", session.user.id)

    // if (error) {
    //   throw new Error(error.message)
    // }

    // const userAccess = profiles[0].has_access
    // console.log({ userAccess })
    const userAccess = true

    if (userAccess) {
      return (
        <main className="min-h-screen p-8 pb-0 overscroll-hidden">
          <ButtonAccount />
          <header className="mb-6 flex items-center">
            {/* <ButtonAccount /> */}
            <div className="flex items-center gap-2 mx-auto">
              <Image
                src={logo}
                alt={`Logo`}
                className="w-8"
                placeholder="blur"
                priority={true}
                width={32}
                height={32}
              />
              <span className="font-extrabold text-lg">BentoGrids</span>
            </div>
          </header>

          <BentoGrid />
        </main>
      )
    } else {
      return <Subscribe />
    }
  } catch (error) {
    console.error("Error in Dashboard:", error.message)
    return <Subscribe />
  }
}
