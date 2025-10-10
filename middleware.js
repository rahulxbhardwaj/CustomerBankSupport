import { NextResponse } from "next/server";
import {jwtVerify} from "jose";

export async function middleware(req) {
 const pathname = req.nextUrl.pathname;
 const token = req.cookies.get("token")?.value
 const url = req.nextUrl.clone();

  if(pathname === "/dashboard"){
    if (!token) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    try {
      // Secret must be a Uint8Array
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      console.error("JWT Verification Error:", err);
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }
  else if(pathname === "/api/fetchUserData"){
    
    if (!token){
      return res.status(401).json({message: "Unauthorized"});
    }
    try{
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    }catch(err){
      console.error("JWT Verification Error:", err);
      return res.status(401).json({message: "Error in fetching user data"});
    }
    
  }
   
  }

export const config = {
  matcher: ["/dashboard/:path*" ,
           "/api/fetchUserData",
            "/api/transfer/sendmoney",
           ],
};
