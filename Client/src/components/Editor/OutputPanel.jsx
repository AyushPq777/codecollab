import React from 'react'
import { Terminal, Play, CheckCircle, XCircle, Clock } from 'lucide-react'

const OutputPanel = ({ output, isRunning }) => {
    const getStatusIcon = () => {
        if (isRunning) return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
        if (output && output.includes('error') || output.includes('Error')) {
            return <XCircle className="w-4 h-4 text-red-500" />
        }
        return <CheckCircle className="w-4 h-4 text-green-500" />
    }

    const getStatusText = () => {
        if (isRunning) return 'Running...'
        if (output && output.includes('error') || output.includes('Error')) {
            return 'Execution Failed'
        }
        return 'Execution Completed'
    }

    return (
        <div className="glass rounded-xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-800/50">
                <div className="flex items-center space-x-3">
                    <Terminal className="w-4 h-4 text-primary-400" />
                    <span className="text-sm font-medium text-white">Output</span>
                </div>

                <div className="flex items-center space-x-2 text-xs">
                    {getStatusIcon()}
                    <span className={
                        isRunning ? 'text-yellow-500' :
                            output && output.includes('error') ? 'text-red-500' : 'text-green-500'
                    }>
                        {getStatusText()}
                    </span>
                </div>
            </div>

            {/* Output Content */}
            <div className="p-4 bg-slate-900/50">
                <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap min-h-[100px] max-h-[200px] overflow-y-auto">
                    {output || (isRunning ? 'Code is running...' : 'Output will appear here after code execution.')}
                </pre>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-white/10 bg-slate-800/50">
                <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-4">
                        <span>Press Ctrl+Enter to run code</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Play className="w-3 h-3" />
                        <span>Code Execution</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OutputPanel