# 🤝 Contributing to AutoFlow AI

Thank you for your interest in contributing to AutoFlow AI! This guide will help you get started with contributing to our open-source project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Testing Guidelines](#testing-guidelines)
6. [Documentation](#documentation)
7. [Pull Request Process](#pull-request-process)

---

## Code of Conduct

### Our Pledge

We are committed to making participation in our project a harassment-free experience for everyone, regardless of:

- Age, body size, disability, ethnicity, gender identity and expression
- Level of experience, education, socioeconomic status, nationality, personal appearance
- Race, religion, or sexual identity and orientation

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, or personal/political attacks
- Public or private harassment
- Publishing others' private information (doxxing)
- Any other conduct which could reasonably be considered inappropriate

### Enforcement

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned with this Code of Conduct.

---

## Getting Started

### Prerequisites

Before you start contributing, make sure you have:

- **Node.js v18+** installed
- **Git** configured and installed
- **GitHub account** with SSH keys set up
- **Code editor** (VS Code recommended)
- **PostgreSQL** and **Redis** for local development

### Development Setup

1. **Fork the Repository**
```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/AutoFlow-AI.git
cd AutoFlow-AI
```

2. **Add Upstream Remote**
```bash
git remote add upstream https://github.com/abx15/AutoFlow-AI.git
git fetch upstream
```

3. **Install Dependencies**
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

4. **Setup Environment**
```bash
# Copy environment templates
cp server/.env.example server/.env
cp client/.env.example client/.env.local

# Configure your local database
cd server
npx prisma generate
npx prisma db push
npm run db:seed
```

5. **Start Development Servers**
```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run dev
```

---

## Development Workflow

### Branch Strategy

We use a simplified Git flow:

```
main                 # Production-ready code
├── develop           # Integration branch for features
├── feature/*         # New features
├── bugfix/*          # Bug fixes
└── hotfix/*          # Critical production fixes
```

### Creating a Feature Branch

```bash
# Sync with latest main
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Commit Guidelines

**Commit Message Format:**
```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no functional change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add OAuth2 provider support

- Implement Google OAuth2 flow
- Add provider configuration UI
- Update authentication middleware

Closes #123
```

### Syncing with Upstream

```bash
# Before starting work
git checkout main
git pull upstream main

# While working on feature
git checkout feature/your-feature
git fetch upstream
git rebase upstream/main
```

---

## Coding Standards

### General Guidelines

- **Write clean, readable code** that others can understand
- **Follow existing code patterns** and conventions
- **Keep functions small** and focused on single responsibility
- **Use meaningful variable and function names**
- **Add comments** for complex logic
- **Remove unused code** and imports

### JavaScript/TypeScript Standards

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

const createUser = async (userData: CreateUserRequest): Promise<User> => {
  const user = await prisma.user.create({
    data: userData
  });
  return user;
};

// ❌ Bad
function createUser(u) {
  return prisma.user.create({ data: u });
}
```

### React/Next.js Standards

```tsx
// ✅ Good component
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// ❌ Bad component
export default function Button(props) {
  return <button {...props}>{props.children}</button>;
}
```

### CSS/Tailwind Standards

```css
/* ✅ Good - Use Tailwind classes */
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900">Title</h2>
</div>

/* ❌ Bad - Custom CSS */
<div className="custom-card">
  <h2 className="title">Title</h2>
</div>
```

### Database Standards

```typescript
// ✅ Good - Use Prisma types
const users = await prisma.user.findMany({
  where: {
    orgId: user.orgId,
    isActive: true
  },
  select: {
    id: true,
    name: true,
    email: true,
    role: true
  },
  orderBy: {
    createdAt: 'desc'
  }
});

// ❌ Bad - Raw SQL
const users = await prisma.$queryRaw`
  SELECT * FROM users WHERE org_id = ${orgId}
`;
```

---

## Testing Guidelines

### Test Structure

```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       ├── Button.test.tsx
│       └── Button.stories.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   └── client.test.ts
│   └── utils/
│       ├── validation.ts
│       └── validation.test.ts
└── modules/
    └── auth/
        ├── auth.service.ts
        ├── auth.service.test.ts
        └── auth.controller.test.ts
```

### Unit Tests

```typescript
// ✅ Good unit test
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests

```typescript
// ✅ Good integration test
import request from 'supertest';
import { app } from '../src/app';

describe('Auth Endpoints', () => {
  it('should register new user', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'SecurePass123',
      orgName: 'Test Org'
    };

    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(userData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.user.email).toBe(userData.email);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- Button.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="auth"
```

### Test Requirements

- **New features must have tests**
- **Bug fixes must include regression tests**
- **Maintain at least 80% code coverage**
- **All tests must pass** before merging

---

## Documentation

### Code Comments

```typescript
/**
 * Creates a new user in the database
 * @param userData - User creation data including name, email, password, and orgName
 * @returns Promise<User> - Created user object with ID and timestamps
 * @throws {ValidationError} - When validation fails
 * @example
 * ```typescript
 * const user = await createUser({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   password: 'SecurePass123',
 *   orgName: 'John Org'
 * });
 * ```
 */
export const createUser = async (userData: CreateUserRequest): Promise<User> => {
  // Implementation
};
```

### README Updates

When adding new features:

1. **Update API documentation** in `docs/API.md`
2. **Update deployment guide** if needed
3. **Add examples** to relevant sections
4. **Update changelog** for new releases

### Inline Documentation

```typescript
// ✅ Good - Clear variable and function names
const calculateTokenUsage = (executions: Execution[]): number => {
  return executions.reduce((total, execution) => total + execution.tokensUsed, 0);
};

// ❌ Bad - Unclear naming
const calc = (e: any[]): number => {
  return e.reduce((t, x) => t + x.tokens, 0);
};
```

---

## Pull Request Process

### Before Submitting

1. **Run all tests**
```bash
npm run test
npm run lint
npm run type-check
```

2. **Update documentation**
- API changes → Update `docs/API.md`
- New features → Update `README.md`
- Breaking changes → Update migration guide

3. **Rebase with main**
```bash
git checkout feature/your-branch
git fetch upstream
git rebase upstream/main
```

### Pull Request Template

```markdown
## Description
Brief description of changes and motivation.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

### Submitting PR

1. **Push to your fork**
```bash
git push origin feature/your-branch
```

2. **Create Pull Request**
- Go to GitHub repository
- Click "New Pull Request"
- Select your feature branch
- Fill out PR template
- Request review from maintainers

### Review Process

1. **Automated checks** must pass:
   - CI/CD pipeline
   - Code coverage
   - Linting rules

2. **Manual review** by maintainers:
   - Code quality and standards
   - Functionality and performance
   - Security considerations
   - Documentation completeness

3. **Approval and merge**:
   - At least one maintainer approval required
   - Address all review comments
   - Maintain clean commit history

---

## Development Tools

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Git Hooks Setup

```bash
# Install husky
npm install --save-dev husky

# Setup pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm run test"

# Setup commit-msg hook
npx husky add .husky/commit-msg "npx commitlint --edit $1"
```

### Debugging Setup

```bash
# VS Code launch configuration (.vscode/launch.json)
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Server",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/server/src/app.js",
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal",
      "restart": true,
      "runtimeExecutable": "nodemon"
    }
  ]
}
```

---

## Community

### Ways to Contribute

- **Code contributions**: Features, bug fixes, improvements
- **Documentation**: Improving guides, API docs, examples
- **Testing**: Bug reports, test coverage improvements
- **Design**: UI/UX improvements, accessibility
- **Translation**: Help with internationalization
- **Community support**: Answer questions, help newcomers

### Getting Help

- **Discussions**: [GitHub Discussions](https://github.com/abx15/AutoFlow-AI/discussions)
- **Issues**: [Report bugs](https://github.com/abx15/AutoFlow-AI/issues)
- **Discord**: [Join our community](https://discord.gg/autoflow)
- **Email**: developers@autoflow.ai

### Recognition

Contributors are recognized in:
- **README.md** - Contributor list
- **Release notes** - Feature attributions
- **Community highlights** - Outstanding contributions
- **Swag opportunities** - Active contributors

---

## License

By contributing to AutoFlow AI, you agree that your contributions will be licensed under the same [MIT License](LICENSE) as the project.

---

Thank you for contributing to AutoFlow AI! 🚀

Every contribution, no matter how small, helps make this project better for everyone.
