import { useState } from 'react';
import { downloadFiles } from '@/data/mockData';
import { Download, FileText, Music, FileSpreadsheet, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Category = 'all' | 'canti' | 'bollettino' | 'moduli';

const iconMap: Record<string, React.ElementType> = {
  pdf: FileText,
  doc: FileSpreadsheet,
  audio: Music,
};

const categoryLabels: Record<Category, string> = {
  all: 'Tutti',
  canti: 'Canti',
  bollettino: 'Bollettini',
  moduli: 'Moduli',
};

export function DownloadSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const filteredFiles = downloadFiles.filter((file) => {
    const matchesSearch = file.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section id="download" className="py-24 bg-slate-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 mb-6">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Area Download</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-slate-800 font-bold mb-6">
            Documenti e Risorse
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Scarica i documenti parrocchiali, i canti liturgici e i moduli necessari 
            per le attività della comunità.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Cerca documenti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 rounded-xl border-slate-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Filter className="w-5 h-5 text-slate-400 flex-shrink-0" />
              {(Object.keys(categoryLabels) as Category[]).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Files List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFiles.map((file) => {
              const IconComponent = iconMap[file.type] || FileText;
              
              return (
                <div
                  key={file.id}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 hover:border-amber-200"
                >
                  <div className="flex items-center gap-6">
                    {/* Icon */}
                    <div className="p-4 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-800 text-lg mb-1 truncate group-hover:text-amber-700 transition-colors">
                        {file.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="uppercase font-medium text-xs bg-slate-100 px-2 py-1 rounded">
                          {file.type}
                        </span>
                        <span>{file.size}</span>
                        <span>{formatDate(file.date)}</span>
                      </div>
                    </div>

                    {/* Download Button */}
                    <a
                      href={file.url}
                      download
                      className="flex-shrink-0"
                    >
                      <Button
                        variant="outline"
                        className="rounded-full border-amber-500 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Scarica
                      </Button>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredFiles.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-slate-600 font-medium text-lg mb-2">
                Nessun documento trovato
              </h3>
              <p className="text-slate-500">
                Prova a modificare i criteri di ricerca
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
