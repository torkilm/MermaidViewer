import React, { useState } from 'react';
import { COLORS } from '../constants';
import { CloseIcon, CheckIcon } from './Icons';

interface GuidePageProps {
  onBack: () => void;
}

interface CodeBlockState {
  [key: string]: boolean;
}

interface CodeBlockProps {
  code: string;
  blockId: string;
  isCopied: boolean;
  onCopy: (code: string, blockId: string) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  blockId,
  isCopied,
  onCopy,
}) => {
  return (
    <div
      className="relative mb-6 rounded-lg overflow-hidden border"
      style={{
        backgroundColor: COLORS.primary.light,
        borderColor: COLORS.border.base,
      }}
    >
      <button
        type="button"
        onClick={() => onCopy(code, blockId)}
        className="absolute top-3 right-3 px-3 py-1.5 rounded-lg transition-all z-10 text-xs font-medium hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95"
        style={{
          backgroundColor: isCopied ? COLORS.success.base : COLORS.accent.base,
          color: COLORS.text.primary,
          boxShadow: isCopied ? 'none' : '0 2px 8px rgba(6, 182, 212, 0.3)',
        }}
        title={isCopied ? 'Copied!' : 'Copy code'}
        aria-label={
          isCopied ? 'Code copied to clipboard' : 'Copy code to clipboard'
        }
      >
        {isCopied ? (
          <>
            <CheckIcon className="w-3 h-3 inline mr-1" />
            Copied!
          </>
        ) : (
          'Copy'
        )}
      </button>
      <pre
        className="p-4 md:p-6 pr-20 md:pr-24 overflow-auto max-h-64 md:max-h-96 text-sm md:text-base font-mono leading-relaxed m-0 whitespace-pre"
        style={{ color: COLORS.text.primary }}
      >
        {code}
      </pre>
    </div>
  );
};

export const GuidePage: React.FC<GuidePageProps> = ({ onBack }) => {
  const [copiedBlocks, setCopiedBlocks] = useState<CodeBlockState>({});

  const handleCopyCode = async (code: string, blockId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedBlocks((prev) => ({ ...prev, [blockId]: true }));
      setTimeout(() => {
        setCopiedBlocks((prev) => ({ ...prev, [blockId]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div
      className="min-h-screen overflow-auto"
      style={{ backgroundColor: COLORS.primary.base }}
    >
      {/* Header */}
      <div
        className="border-b"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: COLORS.primary.base,
          borderColor: COLORS.border.base,
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1
            className="text-xl md:text-2xl font-bold"
            style={{ color: COLORS.text.primary }}
          >
            Mermaid Diagram Guide
          </h1>
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors flex-shrink-0"
            style={{ color: COLORS.text.secondary }}
            aria-label="Back to app"
            title="Back to app"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div id="main-content" className="max-w-4xl mx-auto px-6 py-8 pb-24">
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <h2
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: COLORS.accent.base }}
            >
              What is Mermaid?
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed mb-4"
              style={{ color: COLORS.text.secondary }}
            >
              Mermaid is a JavaScript-based diagramming and charting tool that
              uses Markdown-inspired text definitions to create and modify
              diagrams dynamically. Think of it as drawing with words!
            </p>
            <div className="space-y-3">
              <p
                className="leading-relaxed"
                style={{ color: COLORS.text.secondary }}
              >
                <strong style={{ color: COLORS.text.primary }}>
                  Simple syntax
                </strong>{' '}
                - If you can write text, you can make diagrams
              </p>
              <p
                className="leading-relaxed"
                style={{ color: COLORS.text.secondary }}
              >
                <strong style={{ color: COLORS.text.primary }}>
                  Version control friendly
                </strong>{' '}
                - Your diagrams live in your code
              </p>
              <p
                className="leading-relaxed"
                style={{ color: COLORS.text.secondary }}
              >
                <strong style={{ color: COLORS.text.primary }}>
                  No external tools needed
                </strong>{' '}
                - Works right in your editor
              </p>
              <p
                className="leading-relaxed"
                style={{ color: COLORS.text.secondary }}
              >
                <strong style={{ color: COLORS.text.primary }}>
                  Beautiful results
                </strong>{' '}
                - Professional-looking diagrams every time
              </p>
            </div>
          </section>

          {/* Flowcharts */}
          <section>
            <h2
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: COLORS.accent.base }}
            >
              Flowcharts
            </h2>
            <p
              className="mb-4 leading-relaxed"
              style={{ color: COLORS.text.secondary }}
            >
              Flowcharts are the bread and butter of Mermaid. They&apos;re
              perfect for showing processes, decisions, and workflows.
            </p>

            <h3
              className="text-lg md:text-xl font-semibold mb-3 mt-6"
              style={{ color: COLORS.accent.base }}
            >
              Basic Flowchart
            </h3>
            <CodeBlock
              code={`graph TD
    A[Start Here] --> B[Learn Mermaid]
    B --> C[Create Amazing Diagrams]`}
              blockId="flowchart-basic"
              isCopied={copiedBlocks['flowchart-basic'] || false}
              onCopy={handleCopyCode}
            />

            <h3
              className="text-lg md:text-xl font-semibold mb-3 mt-6"
              style={{ color: COLORS.accent.base }}
            >
              Direction Options
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: COLORS.primary.base }}
              >
                <p className="font-bold" style={{ color: COLORS.text.primary }}>
                  TD/TB
                </p>
                <p
                  className="text-xs md:text-sm"
                  style={{ color: COLORS.text.muted }}
                >
                  Top to Bottom
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: COLORS.primary.base }}
              >
                <p className="font-bold" style={{ color: COLORS.text.primary }}>
                  BT
                </p>
                <p
                  className="text-xs md:text-sm"
                  style={{ color: COLORS.text.muted }}
                >
                  Bottom to Top
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: COLORS.primary.base }}
              >
                <p className="font-bold" style={{ color: COLORS.text.primary }}>
                  LR
                </p>
                <p
                  className="text-xs md:text-sm"
                  style={{ color: COLORS.text.muted }}
                >
                  Left to Right
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: COLORS.primary.base }}
              >
                <p className="font-bold" style={{ color: COLORS.text.primary }}>
                  RL
                </p>
                <p
                  className="text-xs md:text-sm"
                  style={{ color: COLORS.text.muted }}
                >
                  Right to Left
                </p>
              </div>
            </div>
            <CodeBlock
              code={`graph LR
    A[First] --> B[Second] --> C[Third]`}
              blockId="flowchart-direction"
              isCopied={copiedBlocks['flowchart-direction'] || false}
              onCopy={handleCopyCode}
            />

            <h3
              className="text-xl font-semibold mb-3 mt-6"
              style={{ color: COLORS.accent.base }}
            >
              Node Shapes
            </h3>
            <CodeBlock
              code={`graph TD
    A[Rectangle - Basic Node]
    B(Rounded Rectangle)
    C([Stadium - Start/End])
    D{{Hexagon}}
    E{Diamond - Decision}
    F[(Database)]
    G((Circle))`}
              blockId="flowchart-shapes"
              isCopied={copiedBlocks['flowchart-shapes'] || false}
              onCopy={handleCopyCode}
            />

            <h3
              className="text-xl font-semibold mb-3 mt-6"
              style={{ color: COLORS.accent.base }}
            >
              Real-World Example: User Registration
            </h3>
            <CodeBlock
              code={`graph TD
    A[User Visits Site] --> B{Registered?}
    B -->|Yes| C[Login]
    B -->|No| D[Registration Form]
    D --> E{Valid Data?}
    E -->|No| D
    E -->|Yes| F[Create Account]
    F --> G[Send Welcome Email]
    G --> H[Redirect to Dashboard]
    C --> H`}
              blockId="flowchart-example"
              isCopied={copiedBlocks['flowchart-example'] || false}
              onCopy={handleCopyCode}
            />
          </section>

          {/* Sequence Diagrams */}
          <section>
            <h2
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: COLORS.accent.base }}
            >
              Sequence Diagrams
            </h2>
            <p
              className="mb-4 leading-relaxed"
              style={{ color: COLORS.text.secondary }}
            >
              Sequence diagrams are perfect for showing interactions between
              different actors or systems over time.
            </p>

            <h3
              className="text-lg md:text-xl font-semibold mb-3 mt-6"
              style={{ color: COLORS.accent.base }}
            >
              Basic Sequence Diagram
            </h3>
            <CodeBlock
              code={`sequenceDiagram
    participant User
    participant System
    participant Database
    
    User->>System: Request data
    System->>Database: Query
    Database-->>System: Return results
    System-->>User: Display data`}
              blockId="sequence-basic"
              isCopied={copiedBlocks['sequence-basic'] || false}
              onCopy={handleCopyCode}
            />

            <h3
              className="text-xl font-semibold mb-3 mt-6"
              style={{ color: COLORS.accent.base }}
            >
              With Activations & Loops
            </h3>
            <CodeBlock
              code={`sequenceDiagram
    participant User
    participant API
    participant DB
    
    User->>+API: Login request
    API->>+DB: Check credentials
    DB-->>-API: Valid user
    API-->>-User: Success token
    
    loop Every 5 minutes
        API->>API: Check for updates
    end`}
              blockId="sequence-advanced"
              isCopied={copiedBlocks['sequence-advanced'] || false}
              onCopy={handleCopyCode}
            />
          </section>

          {/* Class Diagrams */}
          <section>
            <h2
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: COLORS.accent.base }}
            >
              Class Diagrams
            </h2>
            <p
              className="mb-4 leading-relaxed"
              style={{ color: COLORS.text.secondary }}
            >
              Perfect for showing relationships between classes in your code.
            </p>

            <h3
              className="text-lg md:text-xl font-semibold mb-3 mt-6"
              style={{ color: COLORS.accent.base }}
            >
              Basic Class Diagram
            </h3>
            <CodeBlock
              code={`classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    
    class Dog {
        +String breed
        +bark()
    }
    
    class Cat {
        +String color
        +meow()
    }
    
    Animal <|-- Dog
    Animal <|-- Cat`}
              blockId="class-basic"
              isCopied={copiedBlocks['class-basic'] || false}
              onCopy={handleCopyCode}
            />

            <h3
              className="text-lg md:text-xl font-semibold mb-3 mt-6"
              style={{ color: COLORS.accent.base }}
            >
              Relationship Types
            </h3>
            <CodeBlock
              code={`classDiagram
    classA <|-- classB : Inheritance
    classC *-- classD : Composition
    classE o-- classF : Aggregation
    classG <-- classH : Association
    classI -- classJ : Link
    classK <|.. classL : Realization`}
              blockId="class-relationships"
              isCopied={copiedBlocks['class-relationships'] || false}
              onCopy={handleCopyCode}
            />
          </section>

          {/* State Diagrams */}
          <section>
            <h2
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: COLORS.accent.base }}
            >
              State Diagrams
            </h2>
            <p
              className="mb-4 leading-relaxed"
              style={{ color: COLORS.text.secondary }}
            >
              Show how objects move through different states.
            </p>

            <CodeBlock
              code={`stateDiagram-v2
    [*] --> Draft
    Draft --> Review : Submit
    Review --> Approved : Accept
    Review --> Draft : Request changes
    Approved --> Published : Publish
    Published --> [*]`}
              blockId="state-basic"
              isCopied={copiedBlocks['state-basic'] || false}
              onCopy={handleCopyCode}
            />
          </section>

          {/* Entity Relationship */}
          <section>
            <h2
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: COLORS.accent.base }}
            >
              Entity Relationship Diagrams
            </h2>
            <p
              className="mb-4 leading-relaxed"
              style={{ color: COLORS.text.secondary }}
            >
              Perfect for designing and documenting databases.
            </p>

            <CodeBlock
              code={`erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    
    CUSTOMER {
        string id
        string name
        string email
    }
    
    ORDER {
        string orderNumber
        date orderDate
        string status
    }
    
    LINE-ITEM {
        string productCode
        int quantity
        float price
    }`}
              blockId="er-diagram"
              isCopied={copiedBlocks['er-diagram'] || false}
              onCopy={handleCopyCode}
            />
          </section>

          {/* Gantt Charts */}
          <section>
            <h2
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: COLORS.accent.base }}
            >
              Gantt Charts
            </h2>
            <p
              className="mb-4 leading-relaxed"
              style={{ color: COLORS.text.secondary }}
            >
              Visualize project timelines and dependencies.
            </p>

            <CodeBlock
              code={`gantt
    title Project Development Schedule
    dateFormat YYYY-MM-DD
    
    section Planning
    Requirements gathering :a1, 2024-01-01, 10d
    Design mockups :a2, after a1, 15d
    
    section Development
    Backend development :b1, 2024-01-20, 30d
    Frontend development :b2, after a2, 25d
    Integration :b3, after b1 b2, 10d`}
              blockId="gantt-chart"
              isCopied={copiedBlocks['gantt-chart'] || false}
              onCopy={handleCopyCode}
            />
          </section>

          {/* Pie Charts */}
          <section>
            <h2
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: COLORS.accent.base }}
            >
              Pie Charts
            </h2>
            <p
              className="mb-4 leading-relaxed"
              style={{ color: COLORS.text.secondary }}
            >
              Simple but effective for showing distributions.
            </p>

            <CodeBlock
              code={`pie title Project Time Distribution
    "Development" : 45
    "Testing" : 20
    "Meetings" : 15
    "Documentation" : 12
    "Other" : 8`}
              blockId="pie-chart"
              isCopied={copiedBlocks['pie-chart'] || false}
              onCopy={handleCopyCode}
            />
          </section>

          {/* Git Graph */}
          <section>
            <h2
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: COLORS.accent.base }}
            >
              Git Graphs
            </h2>
            <p
              className="mb-4 leading-relaxed"
              style={{ color: COLORS.text.secondary }}
            >
              Visualize your Git branching strategy.
            </p>

            <CodeBlock
              code={`gitGraph
    commit id: "Initial commit"
    branch develop
    checkout develop
    commit id: "Add feature framework"
    branch feature-login
    checkout feature-login
    commit id: "Create login form"
    commit id: "Add validation"
    checkout develop
    merge feature-login
    checkout main
    merge develop tag: "v1.0"`}
              blockId="git-graph"
              isCopied={copiedBlocks['git-graph'] || false}
              onCopy={handleCopyCode}
            />
          </section>

          {/* Tips & Best Practices */}
          <section>
            <h2
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: COLORS.accent.base }}
            >
              Tips & Best Practices
            </h2>

            <div className="space-y-6">
              <div>
                <h3
                  className="text-lg md:text-xl font-semibold mb-2"
                  style={{ color: COLORS.accent.base }}
                >
                  Keep It Simple
                </h3>
                <p
                  className="mb-3 leading-relaxed"
                  style={{ color: COLORS.text.secondary }}
                >
                  Start with basic diagrams and add complexity as needed. A
                  simple, clear diagram beats a complex, confusing one every
                  time!
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-semibold mb-2"
                  style={{ color: COLORS.accent.base }}
                >
                  Use Meaningful Names
                </h3>
                <CodeBlock
                  code={`graph LR
    A[User Login] --> B{Credentials Valid?}
    B -->|Yes| C[Dashboard]
    B -->|No| D[Error Message]`}
                  blockId="tip-names"
                  isCopied={copiedBlocks['tip-names'] || false}
                  onCopy={handleCopyCode}
                />
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-semibold mb-2"
                  style={{ color: COLORS.accent.base }}
                >
                  Break Complex Diagrams
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ color: COLORS.text.secondary }}
                >
                  Instead of one massive diagram, create several focused
                  diagrams that each tell part of the story.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-semibold mb-2"
                  style={{ color: COLORS.accent.base }}
                >
                  Use Comments
                </h3>
                <CodeBlock
                  code={`graph TD
    %% This is a comment
    A[Start] --> B[Process]
    %% Comments help explain your diagram
    B --> C[End]`}
                  blockId="tip-comments"
                  isCopied={copiedBlocks['tip-comments'] || false}
                  onCopy={handleCopyCode}
                />
              </div>
            </div>
          </section>

          {/* Common Pitfalls */}
          <section>
            <h2
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: COLORS.warning.base }}
            >
              Common Pitfalls to Avoid
            </h2>

            <div className="space-y-6">
              <div>
                <h3
                  className="text-lg md:text-xl font-semibold mb-2"
                  style={{ color: COLORS.text.primary }}
                >
                  Watch Your Syntax
                </h3>
                <p
                  className="mb-2 leading-relaxed"
                  style={{ color: COLORS.text.secondary }}
                >
                  Mermaid is picky about syntax. Missing spaces, wrong arrow
                  types, or typos can break your diagram.
                </p>
                <p
                  className="text-sm font-mono mb-2"
                  style={{ color: COLORS.error.light }}
                >
                  ❌ Wrong: graph TD A-&gt;B
                </p>
                <p
                  className="text-sm font-mono"
                  style={{ color: COLORS.success.light }}
                >
                  ✓ Right: graph TD A --&gt; B
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-semibold mb-2"
                  style={{ color: COLORS.text.primary }}
                >
                  Use Quotes for Special Characters
                </h3>
                <CodeBlock
                  code={`graph TD
    A["Text with: special characters!"]
    B["More (special) text"]`}
                  blockId="pitfall-quotes"
                  isCopied={copiedBlocks['pitfall-quotes'] || false}
                  onCopy={handleCopyCode}
                />
              </div>
            </div>
          </section>

          {/* Resources */}
          <section>
            <h2
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: COLORS.accent.base }}
            >
              Resources & Tools
            </h2>

            <div className="space-y-6">
              <div>
                <p
                  className="mb-3 font-semibold"
                  style={{ color: COLORS.accent.base }}
                >
                  Online Editors
                </p>
                <ul
                  className="space-y-2 ml-6 list-disc"
                  style={{ color: COLORS.text.secondary }}
                >
                  <li className="leading-relaxed">
                    <strong style={{ color: COLORS.text.primary }}>
                      GitHub/GitLab
                    </strong>{' '}
                    - Native Mermaid support in Markdown files
                  </li>
                  <li className="leading-relaxed">
                    <strong style={{ color: COLORS.text.primary }}>
                      Notion
                    </strong>{' '}
                    - Supports Mermaid code blocks
                  </li>
                </ul>
              </div>

              <div>
                <p
                  className="mb-3 font-semibold"
                  style={{ color: COLORS.accent.base }}
                >
                  Official Documentation
                </p>
                <ul
                  className="space-y-2 ml-6 list-disc"
                  style={{ color: COLORS.text.secondary }}
                >
                  <li className="leading-relaxed">
                    GitHub:{' '}
                    <a
                      href="https://github.com/mermaid-js/mermaid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline"
                      style={{ color: COLORS.accent.light }}
                    >
                      github.com/mermaid-js/mermaid
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section
            className="border-t pt-8"
            style={{ borderColor: COLORS.border.base }}
          >
            <h2
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: COLORS.success.base }}
            >
              Your Mermaid Journey Begins!
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: COLORS.text.secondary }}
            >
              Congratulations! You now have all the tools you need to create
              stunning diagrams with Mermaid. Remember: start simple, practice
              regularly, experiment with different diagram types, share your
              work, and most importantly—have fun!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
