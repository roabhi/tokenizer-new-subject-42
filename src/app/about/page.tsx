export default function AboutPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-[2.5rem] font-medium text-[#202537] mb-12">
          About the project
        </h1>
        <div className="space-y-8 text-[#202537] text-lg leading-relaxed">
          <p>
            Tokenizer is an outer core project from the 42 curriculum as a web3 related project.
          </p>
          <p>
            For this project I wanted to go beyond the requirements for the project by providing a tool to put in good use what a native token for the 42 network could bring to students.
          </p>
          <p>
            The goal for me was to incorporate the 42 Curriculum into project in some way and to regard students as they complete rings from the Common Core using an ERC20 token that can only be obtained based on the student's achievements. Using the 42 API I was able to implement an indirect multi signature method to allow students to claim their tokens.
          </p>
          <p>
            This is an on going project and the tokenomics are still under development. The final goal goes beyond the requirements of the project and aims to provide a whole ecosystem for the 42 network where students can exchange the time and effort they put into the 42 curriculum to good use in the real world.
          </p>
        </div>
      </div>
    </div>
  )
} 