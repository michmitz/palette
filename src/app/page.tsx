const getData = async () => {
  const res = await fetch('https://www.thecolorapi.com/scheme?hex=24B1E0')
 
  if (res.status !== 200) {
    throw new Error('Failed to fetch colors')
  }
  const data = res.json()
 
  return data
}

export default async function Home() {
  const data = await getData()
  console.log("DATA IN HOME", data.colors)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4">
        <div className="rounded-lg border px-5 py-4 transition-colors bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 lg:text-center">
          Here is a gradient
        </div>
        <>{data.colors.map((color: any) => {
          return (
            <>{JSON.stringify(color)}</>
          )
        })}</>
      </div>
    </main>
  );
}
