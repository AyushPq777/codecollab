import React from 'react'
import { ChevronDown, Code2 } from 'lucide-react'

const languageOptions = [
    { value: 'javascript', label: 'JavaScript', extension: 'js' },
    { value: 'typescript', label: 'TypeScript', extension: 'ts' },
    { value: 'python', label: 'Python', extension: 'py' },
    { value: 'java', label: 'Java', extension: 'java' },
    { value: 'cpp', label: 'C++', extension: 'cpp' },
    { value: 'c', label: 'C', extension: 'c' },
    { value: 'csharp', label: 'C#', extension: 'cs' },
    { value: 'go', label: 'Go', extension: 'go' },
    { value: 'rust', label: 'Rust', extension: 'rs' },
    { value: 'php', label: 'PHP', extension: 'php' },
    { value: 'ruby', label: 'Ruby', extension: 'rb' },
    { value: 'swift', label: 'Swift', extension: 'swift' },
    { value: 'kotlin', label: 'Kotlin', extension: 'kt' },
    { value: 'html', label: 'HTML', extension: 'html' },
    { value: 'css', label: 'CSS', extension: 'css' },
    { value: 'json', label: 'JSON', extension: 'json' },
    { value: 'markdown', label: 'Markdown', extension: 'md' },
    { value: 'sql', label: 'SQL', extension: 'sql' },
    { value: 'shell', label: 'Shell', extension: 'sh' },
    { value: 'yaml', label: 'YAML', extension: 'yaml' }
]

const LanguageSelector = ({ value, onChange }) => {
    const selectedLanguage = languageOptions.find(lang => lang.value === value) || languageOptions[0]

    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none bg-slate-800 border border-slate-600 hover:border-slate-500 rounded-lg pl-10 pr-8 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors cursor-pointer"
            >
                {languageOptions.map((language) => (
                    <option key={language.value} value={language.value}>
                        {language.label}
                    </option>
                ))}
            </select>

            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Code2 className="w-4 h-4 text-primary-400" />
            </div>

            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {/* Selected language badge */}
            <div className="absolute -top-2 -right-2">
                <span className="px-2 py-1 bg-primary-500 text-white text-xs font-medium rounded-full border-2 border-slate-800">
                    {selectedLanguage.extension}
                </span>
            </div>
        </div>
    )
}

export default LanguageSelector