import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="absolute top-4 right-4 flex gap-4">
        <a href="" className="text-blue-500 hover:underline">
          Home
        </a>
        <a href="/login" className="text-blue-500 hover:underline">
          Login / Sign Up
        </a>
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Cogniscruit
        </h1>
        <p className="text-lg text-center sm:text-left">
          Generating Interview Questions for Candidates Using Large Language
          Models (LLMs)
        </p>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by exploring our project on{" "}
            <a
              href="https://github.com/Raashil/Cogniscruit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              GitHub
            </a>
            .
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://github.com/Raashil/Cogniscruit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/github.svg" // Ensure you have a GitHub icon in your public folder
              alt="GitHub logomark"
              width={20}
              height={20}
            />
            Visit GitHub
          </a>
        </div>
      </main>
    </div>
  );
}
