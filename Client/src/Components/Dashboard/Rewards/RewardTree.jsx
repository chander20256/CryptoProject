import { useState } from "react";
import RewardNode from "./RewardNode";
import { treeData } from "./rewardData";

const RewardTree = () => {
  const [selectedPath, setSelectedPath] = useState(["root"]);
  const [completedNodes, setCompletedNodes] = useState(new Set());
  const [lockedNodes, setLockedNodes] = useState(new Set());
  const [currentLevel, setCurrentLevel] = useState(0);
  const [earnedRewards, setEarnedRewards] = useState(0);

  const lockSiblingNodes = (nodeId) => {
    const findSiblings = (nodes, targetId, parent = null) => {
      for (const node of nodes) {
        if (node.id === targetId && parent) {
          return parent.children.filter(
            (child) => child.id !== targetId
          );
        }
        if (node.children) {
          const siblings = findSiblings(node.children, targetId, node);
          if (siblings) return siblings;
        }
      }
      return null;
    };

    const lockDescendants = (node) => {
      const ids = [];
      const traverse = (n) => {
        ids.push(n.id);
        if (n.children) n.children.forEach(traverse);
      };
      traverse(node);
      return ids;
    };

    const siblings = findSiblings([treeData], nodeId);
    if (siblings) {
      const newLocked = new Set(lockedNodes);
      siblings.forEach((sibling) => {
        lockDescendants(sibling).forEach((id) => newLocked.add(id));
      });
      setLockedNodes(newLocked);
    }
  };

  const handleNodeSelect = (node) => {
    if (completedNodes.has(node.id)) return;

    const newPath = [...selectedPath];
    const index = newPath.indexOf(node.id);

    if (index >= 0) newPath.splice(index + 1);
    else newPath.push(node.id);

    setSelectedPath(newPath);
    lockSiblingNodes(node.id);

    const updatedCompleted = new Set(completedNodes);
    updatedCompleted.add(node.id);
    setCompletedNodes(updatedCompleted);

    const reward = parseInt(node.reward.replace(/[₹,]/g, ""));
    setEarnedRewards((prev) => prev + reward);

    setCurrentLevel(node.level + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Reward Journey Tree
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Choose your path and unlock rewards
          </p>
        </div>

        {/* STATS */}
        <div className="flex justify-center gap-6 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-xl px-6 py-4 shadow-md">
            <p className="text-sm text-slate-500 mb-1">Level</p>
            <p className="text-2xl font-bold text-cyan-600">
              {currentLevel}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl px-6 py-4 shadow-md">
            <p className="text-sm text-slate-500 mb-1">Total Earned</p>
            <p className="text-2xl font-bold text-green-600">
              ₹{earnedRewards}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl px-6 py-4 shadow-md">
            <p className="text-sm text-slate-500 mb-1">Completed</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {completedNodes.size}
            </p>
          </div>
        </div>

        {/* TREE */}
        <div className="flex justify-center overflow-x-auto pb-8">
          <RewardNode
            node={treeData}
            onSelect={handleNodeSelect}
            selectedPath={selectedPath}
            completedNodes={completedNodes}
            currentLevel={currentLevel}
            lockedNodes={lockedNodes}
          />
        </div>

        {/* INSTRUCTION */}
        <div className="flex justify-center mt-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl px-6 py-3 shadow-md">
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
              {currentLevel === 0
                ? "👆 Click a node to start"
                : "✨ Continue your journey"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RewardTree;
