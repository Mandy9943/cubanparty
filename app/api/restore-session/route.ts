import { NextRequest, NextResponse } from "next/server";
import { Account, Client } from "appwrite";
import { PROJECT_ID } from "@/app/appwrite";

const cookieName = `a_session_${PROJECT_ID}`;
export async function POST ( req:NextRequest){
    try{
        const {secret} = await req.json();
        console.log('secret',secret);
        if(!secret){
            return NextResponse.json({ ok: false, error: 'Missing secret' }, { status: 400 });
        }
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
            .setSession(secret);
        const account = new Account(client);
        
        let user;
        try{
            user = await account.get()
            console.log('restore user',user);
        }catch(err){
            return NextResponse.json({ok: false, error: err},{status:401});
        }
        
        //create the httpOnly cookie with the secret from cookieFallback in local storage
        const res = NextResponse.json({ok: true, user})

        res.cookies.set(cookieName, secret, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax",
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 días
        })

        return res;
    }catch(err){
        console.error('restore session error:', err)
        return NextResponse.json({ok: false, error: err}, {status: 500});
    }
}