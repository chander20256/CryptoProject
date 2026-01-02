import { Gift, Lock, CheckCircle, ChevronDown, ChevronRight } from "lucide-react";

const RewardNode = ({
  node,
  onSelect,
  selectedPath,
  completedNodes,
  currentLevel,
  lockedNodes,
}) => {
  const isInPath = selectedPath.includes(node.id);
  const isCompleted = completedNodes.has(node.id);
  const isLocked =
    node.level > currentLevel || lockedNodes.has(node.id);

  return (
    <div className="flex flex-col items-center w-full">
      {/* NODE CARD */}
      <button
        onClick={() => !isLocked && !isCompleted && onSelect(node)}
        disabled={isLocked || isCompleted}
        className={`
          relative w-full sm:min-w-[180px] max-w-[260px]
          px-5 py-4 rounded-xl border-2 transition-all
          ${
            isCompleted
              ? "bg-green-100 border-green-500"
              : isLocked
              ? "bg-slate-200 border-slate-400 opacity-60"
              : isInPath
              ? "bg-cyan-100 border-cyan-500 shadow-lg"
              : "bg-white border-slate-300 hover:border-cyan-400"
          }
        `}
      >
        <div className="flex justify-center mb-2">
          {isCompleted ? (
            <CheckCircle className="text-green-600" />
          ) : isLocked ? (
            <Lock className="text-slate-500" />
          ) : (
            <Gift className="text-cyan-500" />
          )}
        </div>

        <p className="text-sm font-semibold text-center">
          {node.title}
        </p>

        <p className="text-lg font-bold text-cyan-600 text-center">
          {node.reward}
        </p>

        {/* Arrow indicator */}
        {isInPath && !isLocked && !isCompleted && (
          <>
            <ChevronDown className="block sm:hidden mx-auto mt-2 text-cyan-500" />
            <ChevronRight className="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 text-cyan-500" />
          </>
        )}
      </button>

      {/* CHILDREN */}
      {node.children && isInPath && (
        <div
          className="
            flex flex-col sm:flex-row
            gap-6 sm:gap-10
            mt-6
            items-center sm:items-start
            w-full justify-center
          "
        >
          {node.children
            .filter((child) => !lockedNodes.has(child.id))
            .map((child) => (
              <RewardNode
                key={child.id}
                node={child}
                onSelect={onSelect}
                selectedPath={selectedPath}
                completedNodes={completedNodes}
                currentLevel={currentLevel}
                lockedNodes={lockedNodes}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default RewardNode;
