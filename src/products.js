export async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products?action=getProducts");
  const data = await res.json();
  return data
}

export async function findProduct(id) {
  const res = await fetch(
    `http://localhost:3000/api/products?action=findProduct&id=${id}`
  );
  const data = await res.json(); 
  return data;
}
