import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/products";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectMongoDB()
    const products = await Product.find()
    return NextResponse.json({products})
    }catch(error){
        console.log(error)
        return NextResponse.json(
          {
            message: "Failed to fetch products",
            error: error instanceof Error ? error.message : error,
          },
          { status: 500 }
        );
    }
}