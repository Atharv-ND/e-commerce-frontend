import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/products";
import { NextResponse , NextRequest} from "next/server";

export async function GET(req:NextRequest){
    try{
        await connectMongoDB()
        const { searchParams } = new URL(req.url);
        const action = searchParams.get("action");
        switch (action) {
          case "getProducts": {
            const products = await Product.find();
            return NextResponse.json({ products }, { status: 200 });
          }

          case "findProduct": {
            const id = searchParams.get("id");
            if (!id) {
              return NextResponse.json(
                { message: "Product ID is required." },
                { status: 400 }
              );
            }
            const product = await Product.findOne({ product_id: id });
            if (!product) {
              return NextResponse.json(
                { message: "Product not found." },
                { status: 404 }
              );
            }
            return NextResponse.json({ product } , {status: 200});
          }

          default:
            return NextResponse.json(
              { message: "Invalid action specified." },
              { status: 400 }
            );
        }
    
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