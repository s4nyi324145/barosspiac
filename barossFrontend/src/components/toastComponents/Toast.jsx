import { useToast } from "../../context/toastContext"
import { CheckCircle2, XCircle, Info } from "lucide-react";

export default function Toast() {
    const { toasts } = useToast()

    const getToastStyle = (type) => {
        switch (type) {
            case 'success': return 'bg-slate-900 border border-green-500/30 text-green-400 shadow-lg shadow-green-500/10';
            case 'error': return 'bg-slate-900 border border-red-500/30 text-red-400 shadow-lg shadow-red-500/10';
            case 'info': return 'bg-slate-900 border border-blue-500/30 text-blue-400 shadow-lg shadow-blue-500/10';
            default: return 'bg-slate-900 border border-slate-700/50 text-slate-400 shadow-lg';
        }
    }

    const getIconStyle = (type) => {
        switch (type) {
            case 'success': return 'text-green-400';
            case 'error': return 'text-red-400';
            case 'info': return 'text-blue-400';
            default: return 'text-slate-400';
        }
    }

        const getIcon = (type) => {
        switch(type) {
            case 'success': return <CheckCircle2 size={20} />;
            case 'error': return <XCircle size={20} />;
            case 'info': return <Info size={20} />;
            default: return <Info size={20} />;
        }
    }


    return (
        <>
            <div className="fixed top-5 right-5 space-y-2 z-50">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`flex toast-enter flex-row items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium  ${getToastStyle(toast.type)}`}
                    >
                        <span className={`shrink-0 ${getIconStyle(toast.type)}`}>
                            {getIcon(toast.type)}
                        </span>
                        <span className="text-slate-200">{toast.message}</span>
                    </div>
                ))}
            </div>
        </>)
}