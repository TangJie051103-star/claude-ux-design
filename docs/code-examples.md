# 代码规范示例

> 此文件为 [CLAUDE.md](../CLAUDE.md) 中「代码规范」章节的配套示例。
> 规范要点见 CLAUDE.md，此处仅存放具体代码示例。

---

## TypeScript

```typescript
// ✅ 推荐
interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export default function Button({ label, variant = "primary", onClick }: ButtonProps) {
  return (
    <button
      className={variantStyles[variant]}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

// ❌ 避免
function Button(props: any) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

## React

```typescript
// ✅ hooks 顺序示例
function UserProfile({ userId }: { userId: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  const handleEditToggle = () => setIsEditing(prev => !prev);
  const handleSave = async (data: UserData) => {
    await updateUser(userId, data);
    setIsEditing(false);
  };

  if (!user) return <Skeleton />;

  return isEditing ? <EditForm user={user} onSave={handleSave} /> : <UserCard user={user} onEdit={handleEditToggle} />;
}
```

## Tailwind CSS

```typescript
// ✅ 推荐：class 按顺序排列
<div className="flex items-center gap-4 w-full p-4 bg-white border rounded-lg text-sm font-medium hover:shadow-sm">

// ❌ 避免：顺序混乱，难以阅读
<div className="text-sm bg-white hover:shadow-sm rounded-lg p-4 flex w-full gap-4 border items-center font-medium">

// ✅ 按钮变体用 cva
import { cva } from "class-variance-authority";

const buttonVariants = cva("inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium", {
  variants: {
    variant: {
      primary: "bg-indigo-600 text-white hover:bg-indigo-700",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    },
  },
});
```

## 组件目录结构

```
src/components/
├── ui/           # shadcn/ui 基础组件（自动生成）
├── layout/       # Header, Sidebar, Footer 等布局组件
├── features/     # 业务组件（按功能分文件夹）
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── SignUpForm.tsx
│   └── dashboard/
│       ├── StatsCard.tsx
│       └── ChartPanel.tsx
└── shared/       # 跨功能复用的组件
    ├── EmptyState.tsx
    └── ErrorBoundary.tsx
```

## 可访问性

```typescript
// ✅ 图标按钮可访问示例
<button onClick={handleClose} aria-label="关闭" type="button">
  <X className="w-5 h-5" aria-hidden="true" />
</button>

// ✅ 模态框焦点环
<div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg">
```

## 错误与边界情况

```typescript
// ✅ 四态覆盖模式
function UserList() {
  const { data, error, isLoading } = useUsers();

  if (isLoading) return <UserListSkeleton />;
  if (error) return <ErrorCard message={error.message} onRetry={refetch} />;
  if (!data?.length) return <EmptyState icon={Users} title="暂无用户" description="创建第一个用户开始使用" />;

  return data.map(user => <UserCard key={user.id} user={user} />);
}
```
