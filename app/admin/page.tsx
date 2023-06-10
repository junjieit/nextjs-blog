import Link from "next/link";

export default function Admin() {
  return (
    <div className="p-6 h-screen divide-solid divide-y">
      <div className="p-6 rounded-xl shadow-lg bg-white">
        <div>
          <div className="text-xl font-medium">管理</div>
          <div className="text-sm text-slate-500">对文档进行新增或管理</div>
        </div>
        <Link href="/article/new" className="mt-6 divide-solid divide-y">
          <div className="py-4">
            <div className="text-lg font-medium">新增文档</div>
            <div className="text-sm text-slate-500">新建一篇 md 文档</div>
          </div>
          <div className="py-4">
            <div className="text-lg font-medium">管理文档</div>
            <div className="text-sm text-slate-500">展示文档结构进行管理</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
