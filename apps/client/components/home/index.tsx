import PlanetOutline from '@icons/planet-outline.svg'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-16 aspect-square">
        <PlanetOutline />
      </div>
      <div className="flex flex-col">
        <Link
          href="https://baraa.app"
          className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200 ease-in-out"
        >
          baraa.app
        </Link>
        <p className="text-gray-400 text-sm font-medium">
          Turborepo Template
        </p>
      </div>
    </div>
  )
}

export default Home