export const sampleCourse = {
  id: "java-basics",
  title: "Java Programming",
  description:
    "A structured path from Java fundamentals to practical programming.",
  modules: [
    {
      id: "introduction",
      title: "Introduction to Java",
      lessons: [
        {
          id: "what-is-java",
          title: "What is Java?",
          duration: "5 min",
          content: {
            introduction:
              "Java is a general-purpose, class-based programming language widely used to build backend systems, enterprise applications, and Android applications.",
            sections: [
              {
                heading: "Why learn Java?",
                paragraphs: [
                  "Java provides a rich standard library, object-oriented programming features, and a mature ecosystem.",
                  "It is commonly used in enterprise software, backend development, and large-scale applications.",
                ],
                bullets: [
                  "Platform independence through the JVM",
                  "Object-oriented programming",
                  "Automatic memory management",
                ],
              },
            ],
            example: {
              title: "Your first Java program",
              code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
              explanation:
                "The main method is the entry point of this program. println displays the message in the console.",
            },
            keyTakeaway:
              "Java source code is compiled into bytecode that can run on a compatible Java Virtual Machine.",
          },
        },
        {
          id: "jvm-jre-jdk",
          title: "JVM, JRE and JDK",
          duration: "8 min",
          content: {
            introduction:
              "The JDK, JRE and JVM have different roles in developing and running Java applications.",
            sections: [
              {
                heading: "Understanding the components",
                paragraphs: [
                  "The JVM executes Java bytecode. The JDK provides development tools, including the Java compiler. The runtime components required to execute an application are provided by the Java runtime environment.",
                ],
                bullets: [
                  "JVM: Executes bytecode",
                  "JRE: Runtime components and JVM",
                  "JDK: Development tools and runtime components",
                ],
              },
            ],
            example: {
              title: "Compile and run",
              code: "javac Main.java\njava Main",
              explanation:
                "javac compiles the source file. The java command launches the application.",
            },
            keyTakeaway:
              "Use the JDK to develop Java applications and the JVM to execute their bytecode.",
          },
        },
      ],
    },
    {
      id: "fundamentals",
      title: "Java Fundamentals",
      lessons: [
        {
          id: "variables",
          title: "Variables and Data Types",
          duration: "10 min",
          content: {
            introduction:
              "Variables give names to values that a program needs to store and use.",
            sections: [
              {
                heading: "Declaring a variable",
                paragraphs: [
                  "Java is statically typed, so a variable declaration specifies a type. That type determines which values can be assigned to the variable.",
                ],
                bullets: [
                  "int stores integer values",
                  "double stores floating-point values",
                  "boolean stores true or false",
                  "String represents text",
                ],
              },
            ],
            example: {
              title: "Student information",
              code: 'int age = 21;\ndouble cgpa = 8.5;\nString name = "Arun";',
              explanation:
                "Each variable has a declared type, a name and an assigned value.",
            },
            keyTakeaway:
              "Choose a data type that represents the kind of value your variable needs.",
          },
        },
        {
          id: "operators",
          title: "Operators",
          duration: "8 min",
          content: {
            introduction:
              "Operators perform operations on values and variables, such as arithmetic, comparisons and logical evaluation.",
            sections: [
              {
                heading: "Common operator types",
                paragraphs: [
                  "Java groups operators by the kinds of operations they perform.",
                ],
                bullets: [
                  "Arithmetic: +, -, *, /, %",
                  "Comparison: ==, !=, <, >",
                  "Logical: &&, ||, !",
                  "Assignment: =, +=, -=",
                ],
              },
            ],
            example: {
              title: "Calculate a total",
              code: "int price = 100;\nint quantity = 3;\nint total = price * quantity;\nSystem.out.println(total);",
              explanation:
                "Multiplication calculates the total price. The output is 300.",
            },
            keyTakeaway:
              "Select operators according to the operation and data types involved.",
          },
        },
        {
          id: "control-flow",
          title: "Control Flow",
          duration: "12 min",
          content: {
            introduction:
              "Control flow determines which statements execute and how many times they run.",
            sections: [
              {
                heading: "Decisions and repetition",
                paragraphs: [
                  "Conditional statements select a path based on a condition. Loops repeat statements while their conditions allow it.",
                ],
                bullets: ["if and else", "switch", "for loops", "while loops"],
              },
            ],
            example: {
              title: "Check an age",
              code: 'int age = 21;\nif (age >= 18) {\n    System.out.println("Adult");\n} else {\n    System.out.println("Minor");\n}',
              explanation:
                "The condition is true, so the program prints Adult.",
            },
            keyTakeaway:
              "Use conditions for decisions and loops for repetition.",
          },
        },
      ],
    },
  ],
};
