import React from 'react'

const Home = () => {
  return (

<section className="bg-center min-h-screen bg-no-repeat bg-gray-700 bg-cover bg-blend-multiply"  style={{ backgroundImage: 'url("/background4.jpg")' }}>
    <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Gérez vos projets sans effort et collaborez en toute transparence</h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Simplifiez la gestion de vos projets grâce à notre puissante plateforme. Attribuez des tâches, suivez la progression et augmentez la productivité, le tout depuis un seul et même endroit. Commencez dès aujourd'hui et transformez la façon dont votre équipe travaille.</p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="/dashboard" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
            Commencer
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
            <a href="/dashboard" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
            Apprendre encore plus
            </a>  
        </div>
    </div>
</section>

  )
}

export default Home