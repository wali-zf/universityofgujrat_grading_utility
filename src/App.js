import React, { useState, useEffect } from 'react';

// --- SELF-CONTAINED ICONS ---
const Icons = {
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Trash2: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>,
  Calculator: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path></svg>,
  Info: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
  GraduationCap: ({ size = 24 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  User: ({ size = 14, style }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  RotateCcw: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>,
  Sparkles: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>,
  Settings: ({ className, style }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  Share2: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  BookOpen: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
  Layers: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>
};

const GradingPolicyCalculator = () => {
  
  // Custom URL Parser that understands all formats
  const parseUrlState = () => {
    const defaultCourses = [
      { id: 1, name: 'Subject 1', credits: 3, marks: '' },
      { id: 2, name: 'Subject 2', credits: 3, marks: '' },
      { id: 3, name: 'Subject 3', credits: 3, marks: '' },
      { id: 4, name: 'Subject 4', credits: 3, marks: '' },
    ];
    const defaultSemesters = [
      { id: 1, name: 'Semester 1', credits: '', sgpa: '' },
      { id: 2, name: 'Semester 2', credits: '', sgpa: '' },
    ];
    
    try {
      const hash = window.location.hash.substring(1);
      if (!hash) return { tab: 'subject', courses: defaultCourses, includeCGPA: false, currentCredits: '', currentCGPA: '', semesters: defaultSemesters };

      const decoded = atob(hash);

      // --- New Format: Semester Mode (~ indicator) ---
      if (decoded.startsWith('~')) {
         const parsedSems = decoded.substring(1).split(';').map(str => {
           const [n, sgpa, c] = str.split('|');
           return { id: Date.now() + Math.random(), name: n || '', sgpa: sgpa || '', credits: c || '' };
         });
         return { tab: 'semester', courses: defaultCourses, includeCGPA: false, currentCredits: '', currentCGPA: '', semesters: parsedSems };
      }

      // --- Format: Subject Mode with CGPA (! indicator) ---
      if (decoded.startsWith('!')) {
         const parts = decoded.substring(1).split(';');
         const cgpaData = parts[0].split(',');
         const includeCGPA = cgpaData[0] === '1';
         const currentCredits = cgpaData[1] || '';
         const currentCGPA = cgpaData[2] || '';

         const parsedCourses = parts.slice(1).map(str => {
           const [n, c, m] = str.split('|');
           return { id: Date.now() + Math.random(), name: n || '', credits: c || 0, marks: m || '' };
         });
         return { tab: 'subject', courses: parsedCourses, includeCGPA, currentCredits, currentCGPA, semesters: defaultSemesters };
      }

      // --- Old Format: Subject Mode Basic ---
      if (decoded.includes('|')) {
         const parsedCourses = decoded.split(';').map(str => {
           const [n, c, m] = str.split('|');
           return { id: Date.now() + Math.random(), name: n || '', credits: c || 0, marks: m || '' };
         });
         return { tab: 'subject', courses: parsedCourses, includeCGPA: false, currentCredits: '', currentCGPA: '', semesters: defaultSemesters };
      }
      
    } catch (e) {
      console.log('No valid state in URL');
    }
    
    return { tab: 'subject', courses: defaultCourses, includeCGPA: false, currentCredits: '', currentCGPA: '', semesters: defaultSemesters };
  };

  const initialState = parseUrlState();

  // State
  const [activeTab, setActiveTab] = useState(initialState.tab); // 'subject' or 'semester'
  const [courses, setCourses] = useState(initialState.courses);
  const [semesters, setSemesters] = useState(initialState.semesters);
  
  const [includeCGPA, setIncludeCGPA] = useState(initialState.includeCGPA);
  const [currentCredits, setCurrentCredits] = useState(initialState.currentCredits);
  const [currentCGPA, setCurrentCGPA] = useState(initialState.currentCGPA);
  
  const [showPolicy, setShowPolicy] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync state to URL hash for sharing based on active tab
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let finalStr = '';
      
      if (activeTab === 'subject') {
        const coursesStr = courses.map(c => {
           const safeName = (c.name || '').replace(/[|;!~]/g, ' ');
           return `${safeName}|${c.credits}|${c.marks}`;
        }).join(';');
        const cgpaStr = `!${includeCGPA ? '1' : '0'},${currentCredits},${currentCGPA}`;
        finalStr = `${cgpaStr};${coursesStr}`;
      } else {
        const semsStr = semesters.map(s => {
           const safeName = (s.name || '').replace(/[|;!~]/g, ' ');
           return `${safeName}|${s.sgpa}|${s.credits}`;
        }).join(';');
        finalStr = `~${semsStr}`;
      }
      
      const encoded = btoa(finalStr);
      window.history.replaceState(null, '', `#${encoded}`);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [courses, includeCGPA, currentCredits, currentCGPA, activeTab, semesters]);

  const getGradeDetails = (marks) => {
    if (marks === '' || marks === null) return { point: 0, letter: '-' };
    const m = Math.round(Number(marks));
    if (m >= 85) return { point: 4.00, letter: 'A' };
    if (m < 50) return { point: 0.00, letter: 'F' };

    const scale = {
      84: 3.93, 83: 3.87, 82: 3.80, 81: 3.73, 80: 3.67,
      79: 3.60, 78: 3.53, 77: 3.47, 76: 3.40, 75: 3.33, 74: 3.27, 73: 3.20,
      72: 3.13, 71: 3.07, 70: 3.00, 69: 2.90, 68: 2.80, 67: 2.70, 66: 2.60, 65: 2.50,
      64: 2.40, 63: 2.30, 62: 2.20, 61: 2.10, 60: 2.00, 59: 1.90, 58: 1.80, 57: 1.70, 56: 1.60, 55: 1.50,
      54: 1.40, 53: 1.30, 52: 1.20, 51: 1.10, 50: 1.00
    };

    const point = scale[m];
    let letter = 'F';
    if (m >= 80) letter = 'A';
    else if (m >= 65) letter = 'B';
    else if (m >= 54) letter = 'C';
    else if (m >= 50) letter = 'D';

    return { point: point !== undefined ? point : 0.00, letter };
  };

  // Subject Actions
  const addCourse = () => setCourses([...courses, { id: Date.now(), name: `Subject ${courses.length + 1}`, credits: 3, marks: '' }]);
  const removeCourse = (id) => { if (courses.length > 1) setCourses(courses.filter(c => c.id !== id)); };
  const updateCourse = (id, field, value) => setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));

  // Semester Actions
  const addSemester = () => setSemesters([...semesters, { id: Date.now(), name: `Semester ${semesters.length + 1}`, credits: '', sgpa: '' }]);
  const removeSemester = (id) => { if (semesters.length > 1) setSemesters(semesters.filter(s => s.id !== id)); };
  const updateSemester = (id, field, value) => setSemesters(semesters.map(s => s.id === id ? { ...s, [field]: value } : s));

  const resetForm = () => {
    if (window.confirm('Are you sure you want to reset all fields in this calculator?')) {
      if (activeTab === 'subject') {
        setCourses([{ id: 1, name: 'Subject 1', credits: 3, marks: '' }, { id: 2, name: 'Subject 2', credits: 3, marks: '' }, { id: 3, name: 'Subject 3', credits: 3, marks: '' }]);
        setIncludeCGPA(false); setCurrentCredits(''); setCurrentCGPA('');
      } else {
        setSemesters([{ id: 1, name: 'Semester 1', credits: '', sgpa: '' }, { id: 2, name: 'Semester 2', credits: '', sgpa: '' }]);
      }
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  const shareResult = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  };

  // --- CALCULATION LOGIC ---
  
  // Subject Stats
  const calculateSubjectStats = () => {
    let currentPoints = 0; let semesterCredits = 0;
    courses.forEach(c => {
      const cr = parseFloat(c.credits) || 0; const mk = c.marks;
      if (cr > 0 && mk !== '') {
        const { point } = getGradeDetails(mk);
        currentPoints += point * cr; semesterCredits += cr;
      }
    });
    const sgpa = semesterCredits === 0 ? 0 : (currentPoints / semesterCredits);
    
    let cgpa = sgpa; let totalCreditsOverall = semesterCredits;
    if (includeCGPA) {
      const pCredits = parseFloat(currentCredits) || 0;
      const pCGPA = parseFloat(currentCGPA) || 0;
      totalCreditsOverall = pCredits + semesterCredits;
      cgpa = totalCreditsOverall > 0 ? ((pCredits * pCGPA) + currentPoints) / totalCreditsOverall : 0;
    }
    return { sgpa: sgpa.toFixed(2), cgpa: cgpa.toFixed(2), semesterCredits, totalCreditsOverall };
  };

  // Semester Stats
  const calculateSemesterStats = () => {
    let totalPoints = 0; let totalCredits = 0;
    semesters.forEach(s => {
      const cr = parseFloat(s.credits) || 0; const sgpa = parseFloat(s.sgpa) || 0;
      if (cr > 0 && sgpa > 0) {
        totalPoints += (sgpa * cr); totalCredits += cr;
      }
    });
    return { cgpa: totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00', totalCredits };
  };

  const subjectStats = calculateSubjectStats();
  const semesterStats = calculateSemesterStats();
  
  const displayValue = activeTab === 'subject' 
    ? (includeCGPA ? parseFloat(subjectStats.cgpa) : parseFloat(subjectStats.sgpa))
    : parseFloat(semesterStats.cgpa);
    
  const displayCredits = activeTab === 'subject'
    ? (includeCGPA ? subjectStats.totalCreditsOverall : subjectStats.semesterCredits)
    : semesterStats.totalCredits;
  
  useEffect(() => {
    if (displayValue >= 3.5 && displayCredits > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [displayValue, displayCredits]);

  const colors = { primary: '#2A388F', secondary: '#EAA92A' };

  const Confetti = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50 h-screen">
      {[...Array(50)].map((_, i) => (
        <div key={i} className="absolute animate-fall" style={{ left: `${Math.random() * 100}%`, top: `-20px`, animationDuration: `${Math.random() * 3 + 2}s`, animationDelay: `${Math.random() * 2}s`, width: '10px', height: '10px', background: ['#EAA92A', '#2A388F', '#ef4444', '#10b981'][Math.floor(Math.random() * 4)], transform: `rotate(${Math.random() * 360}deg)` }} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-slate-800 pb-12 relative overflow-x-hidden bg-slate-100">
      <style>{`
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
        @keyframes fall { 0% { transform: translateY(-20px) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(360deg); opacity: 0; } }
        @keyframes slide-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fall { animation: fall linear forwards; }
        .animate-slide-in { animation: slide-in 0.6s ease-out forwards; }
        .toggle-checkbox:checked { right: 0; border-color: #2A388F; }
        .toggle-checkbox:checked + .toggle-label { background-color: #2A388F; }
      `}</style>

      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] md:w-[40%] md:h-[40%] rounded-full bg-blue-200/30 blur-3xl animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] md:w-[50%] md:h-[50%] rounded-full bg-amber-100/40 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {showConfetti && <Confetti />}

      {/* Header */}
      <div className="relative z-10 bg-white/95 backdrop-blur-md border-b-4 shadow-sm" style={{ borderColor: colors.secondary }}>
        <div className="max-w-5xl mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex justify-center md:justify-start w-full md:w-auto h-20 items-center">
              {!logoError ? (
                <img src="https://upload.wikimedia.org/wikipedia/en/2/25/University_of_Gujrat_logo.png" alt="University of Gujrat Logo"
                  className="h-16 md:h-20 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105 duration-300"
                  onError={() => setLogoError(true)} />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#2A388F] rounded-b-3xl rounded-t-md opacity-10"></div>
                    <div className="relative z-10 font-black text-4xl md:text-5xl tracking-tighter" style={{ color: colors.primary }}>UOG</div>
                    <Icons.Settings className="absolute -top-1 -right-2 w-6 h-6 animate-spin-slow" style={{ color: colors.secondary, animationDuration: '10s' }} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-bold uppercase leading-none" style={{ color: colors.primary }}>University of</span>
                    <span className="text-xl md:text-3xl font-black uppercase leading-none" style={{ color: colors.primary }}>Gujrat</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] mt-1" style={{ color: colors.secondary }}>A World Class University</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tool</span>
                <span className="text-sm font-bold text-slate-700">CGPA/SGPA Calculator</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-full border border-slate-200 shadow-sm">
                <Icons.Calculator className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`max-w-5xl mx-auto px-4 mt-6 md:mt-8 transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/50 animate-slide-in">
          
          {/* TABS Navigation */}
          <div className="bg-slate-50/50 px-6 pt-6 pb-2 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row bg-slate-200/50 p-1.5 rounded-xl gap-1">
              <button onClick={() => setActiveTab('subject')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'subject' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>
                <Icons.BookOpen className="w-4 h-4" /> 1. Predict New CGPA (By Subject)
              </button>
              <button onClick={() => setActiveTab('semester')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'semester' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>
                <Icons.Layers className="w-4 h-4" /> 2. Complete Degree CGPA (By Semester)
              </button>
            </div>
          </div>

          {/* DASHBOARD */}
          <div className="p-6 md:p-8 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 bg-gradient-to-br from-white to-blue-50/30">
            <div className="text-center md:text-left flex-1">
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center justify-center md:justify-start gap-2">
                {activeTab === 'semester' ? 'Overall Degree CGPA' : (includeCGPA ? 'Estimated New CGPA' : 'Semester GPA')}
                {displayValue >= 3.5 && displayCredits > 0 && <Icons.Sparkles className="text-yellow-500 animate-pulse" />}
              </h2>
              <p className="text-slate-500 text-xs md:text-sm mt-1 max-w-xs md:max-w-md mx-auto md:mx-0">
                {activeTab === 'semester' ? 'Combine all your semester SGPAs to find your final overall CGPA.' : 'Enter your new subject marks to calculate your SGPA.'}
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-6 md:gap-12 w-full md:w-auto">
               <div className="hidden sm:flex relative w-32 h-16 items-end justify-center overflow-hidden">
                  <svg className="w-32 h-32 absolute top-0" viewBox="0 0 100 50">
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={displayValue >= 3.5 ? colors.secondary : colors.primary} 
                      strokeWidth="8" strokeLinecap="round" strokeDasharray="125.6"
                      strokeDashoffset={125.6 - (125.6 * (displayValue / 4))} className="transition-all duration-1000 ease-out" />
                  </svg>
                  <span className="absolute bottom-0 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     {activeTab === 'semester' ? 'CGPA' : (includeCGPA ? 'NEW CGPA' : 'SGPA')}
                  </span>
               </div>
               
              <div className="text-center relative">
                <div className={`absolute -inset-4 rounded-full blur-xl opacity-20 ${displayValue > 3 ? 'bg-yellow-400' : 'bg-blue-600'}`}></div>
                <p className="text-5xl md:text-6xl font-black font-mono tracking-tighter transition-all duration-500" style={{ color: displayValue >= 3.5 ? colors.secondary : colors.primary }}>
                  {activeTab === 'semester' ? semesterStats.cgpa : (includeCGPA ? subjectStats.cgpa : subjectStats.sgpa)}
                </p>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-wide text-slate-400 mt-1">
                  {displayCredits} Total Cr
                </div>
              </div>
              
              {/* Extra stat for Subject tab when CGPA is included */}
              {activeTab === 'subject' && includeCGPA && (
                <div className="hidden md:block pl-6 border-l border-slate-200">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1 tracking-wider">This SGPA</p>
                  <p className="text-2xl font-bold font-mono text-slate-700">{subjectStats.sgpa}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1">{subjectStats.semesterCredits} Cr</p>
                </div>
              )}
            </div>
          </div>

          {/* === TAB 1: SUBJECT CALCULATOR === */}
          {activeTab === 'subject' && (
            <div className="animate-in fade-in duration-300">
              {/* Predict CGPA Toggle */}
              <div className="bg-slate-50 border-b border-slate-200 px-4 md:px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" name="toggle" id="toggle" checked={includeCGPA} onChange={() => setIncludeCGPA(!includeCGPA)}
                      className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      style={{ top: '2px', left: includeCGPA ? '22px' : '2px', transition: 'all 0.3s', zIndex: 10, borderColor: includeCGPA ? colors.primary : '#cbd5e1' }}/>
                    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer" style={{ transition: 'all 0.3s' }}></label>
                  </div>
                  <label htmlFor="toggle" className="text-sm font-bold text-slate-700 cursor-pointer select-none">
                    I already have a CGPA (Add it to predict New CGPA)
                  </label>
                </div>
                
                {includeCGPA && (
                  <div className="flex gap-3 md:gap-6 w-full md:w-auto animate-slide-in bg-white p-3 rounded-lg border shadow-sm">
                    <div className="flex-1 md:flex-none">
                      <span className="text-[10px] md:text-xs uppercase font-bold text-slate-500 block mb-1">Your Current CGPA</span>
                      <input type="number" step="0.01" value={currentCGPA} onChange={e => setCurrentCGPA(e.target.value)} 
                        className="w-full md:w-32 border border-slate-200 rounded-md py-1.5 px-2 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 transition-all text-center" placeholder="e.g. 3.25" />
                    </div>
                    <div className="flex-1 md:flex-none">
                      <span className="text-[10px] md:text-xs uppercase font-bold text-slate-500 block mb-1">Earned Credits</span>
                      <input type="number" value={currentCredits} onChange={e => setCurrentCredits(e.target.value)} 
                        className="w-full md:w-32 border border-slate-200 rounded-md py-1.5 px-2 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 transition-all text-center" placeholder="e.g. 65" />
                    </div>
                  </div>
                )}
              </div>

              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b text-xs font-bold uppercase tracking-wider bg-white" style={{ color: colors.primary }}>
                <div className="col-span-6 pl-2">Current Semester Subject</div>
                <div className="col-span-2 text-center">Cr. Hr</div>
                <div className="col-span-2 text-center">Marks (%)</div>
                <div className="col-span-2 text-center">Result</div>
              </div>
              
              <div className="md:hidden px-4 py-3 bg-white text-xs font-bold uppercase tracking-wider text-center text-slate-400 border-b">Current Semester Subjects</div>

              <div className="divide-y divide-slate-100 bg-white">
                {courses.map((course, index) => {
                  const { point, letter } = getGradeDetails(course.marks);
                  return (
                    <div key={course.id} className="p-4 md:px-6 md:py-5 hover:bg-blue-50/30 transition-all duration-200 group relative">
                      <div className="grid grid-cols-12 gap-3 md:gap-4 items-center">
                        <div className="col-span-12 md:col-span-6 flex items-center gap-3">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-[10px] font-bold text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">{index + 1}</span>
                          <input type="text" value={course.name} onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                            className="w-full bg-transparent border-b border-transparent focus:border-blue-500 p-1 text-slate-700 font-semibold placeholder-slate-300 focus:outline-none transition-all text-sm md:text-base" placeholder="Subject Name" />
                        </div>
                        <div className="col-span-12 md:col-span-6 grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 items-center mt-1 md:mt-0">
                          <div className="col-span-1 md:col-span-2">
                             <label className="md:hidden text-[10px] font-bold text-slate-400 uppercase block mb-1">Credits</label>
                             <input type="number" value={course.credits} onChange={(e) => updateCourse(course.id, 'credits', Math.max(0, e.target.value))}
                              className="w-full text-center bg-slate-50 border border-slate-200 rounded-lg py-2 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:border-blue-500 transition-all text-sm md:text-base" placeholder="3" />
                          </div>
                          <div className="col-span-1 md:col-span-2">
                            <label className="md:hidden text-[10px] font-bold text-slate-400 uppercase block mb-1">Marks</label>
                            <input type="number" value={course.marks} onChange={(e) => updateCourse(course.id, 'marks', Math.min(100, Math.max(0, e.target.value)))}
                              className={`w-full text-center border rounded-lg py-2 font-bold focus:outline-none focus:ring-2 transition-all text-sm md:text-base ${course.marks === '' ? 'border-slate-200 bg-slate-50' : 'bg-white shadow-sm'}`}
                              style={{ borderColor: course.marks !== '' ? (letter === 'F' ? '#ef4444' : colors.primary) : '', color: course.marks !== '' ? (letter === 'F' ? '#ef4444' : colors.primary) : '' }} placeholder="-" />
                          </div>
                          <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-2">
                            <div className="flex flex-col items-center w-full md:w-auto">
                               <label className="md:hidden text-[10px] font-bold text-slate-400 uppercase block mb-1">Grade</label>
                               {course.marks !== '' ? (
                                <div className="flex items-baseline gap-1 md:flex-col md:gap-0">
                                  <span className={`text-lg font-extrabold leading-none ${letter === 'A' ? 'text-yellow-600' : letter === 'F' ? 'text-red-500' : 'text-slate-700'}`}>{letter}</span>
                                  <span className="text-[10px] text-slate-400 font-mono hidden md:block">{point.toFixed(2)}</span>
                                </div>
                              ) : <span className="text-slate-300 text-lg">-</span>}
                            </div>
                            <button onClick={() => removeCourse(course.id)} className="md:opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all md:translate-x-2" title="Remove"><Icons.Trash2 size={16} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* === TAB 2: SEMESTER CALCULATOR === */}
          {activeTab === 'semester' && (
            <div className="animate-in fade-in duration-300">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b text-xs font-bold uppercase tracking-wider bg-white" style={{ color: colors.primary }}>
                <div className="col-span-6 pl-2">Semester Detail</div>
                <div className="col-span-2 text-center">Cr. Hr</div>
                <div className="col-span-2 text-center">SGPA</div>
                <div className="col-span-2 text-center">Points</div>
              </div>
              <div className="md:hidden px-4 py-3 bg-white text-xs font-bold uppercase tracking-wider text-center text-slate-400 border-b">Enter Semester Details</div>

              <div className="divide-y divide-slate-100 bg-white">
                {semesters.map((sem, index) => {
                  const pts = (parseFloat(sem.sgpa) || 0) * (parseFloat(sem.credits) || 0);
                  const valid = sem.sgpa !== '' && sem.credits !== '';
                  return (
                    <div key={sem.id} className="p-4 md:px-6 md:py-5 hover:bg-emerald-50/30 transition-all duration-200 group relative">
                      <div className="grid grid-cols-12 gap-3 md:gap-4 items-center">
                        <div className="col-span-12 md:col-span-6 flex items-center gap-3">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-[10px] font-bold text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">{index + 1}</span>
                          <input type="text" value={sem.name} onChange={(e) => updateSemester(sem.id, 'name', e.target.value)}
                            className="w-full bg-transparent border-b border-transparent focus:border-emerald-500 p-1 text-slate-700 font-semibold placeholder-slate-300 focus:outline-none transition-all text-sm md:text-base" placeholder="Semester Name" />
                        </div>
                        <div className="col-span-12 md:col-span-6 grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 items-center mt-1 md:mt-0">
                          <div className="col-span-1 md:col-span-2">
                             <label className="md:hidden text-[10px] font-bold text-slate-400 uppercase block mb-1">Credits</label>
                             <input type="number" value={sem.credits} onChange={(e) => updateSemester(sem.id, 'credits', Math.max(0, e.target.value))}
                              className="w-full text-center bg-slate-50 border border-slate-200 rounded-lg py-2 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:border-emerald-500 transition-all text-sm md:text-base" placeholder="e.g. 18" />
                          </div>
                          <div className="col-span-1 md:col-span-2">
                            <label className="md:hidden text-[10px] font-bold text-slate-400 uppercase block mb-1">SGPA</label>
                            <input type="number" step="0.01" value={sem.sgpa} onChange={(e) => updateSemester(sem.id, 'sgpa', Math.min(4, Math.max(0, e.target.value)))}
                              className={`w-full text-center border rounded-lg py-2 font-bold focus:outline-none focus:ring-2 transition-all text-sm md:text-base ${sem.sgpa === '' ? 'border-slate-200 bg-slate-50' : 'bg-white shadow-sm border-emerald-600 text-emerald-700'}`} placeholder="e.g. 3.5" />
                          </div>
                          <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-2">
                            <div className="flex flex-col items-center w-full md:w-auto">
                               <label className="md:hidden text-[10px] font-bold text-slate-400 uppercase block mb-1">Points</label>
                               {valid ? (
                                <div className="flex items-baseline gap-1 md:flex-col md:gap-0">
                                  <span className="text-lg font-extrabold leading-none text-slate-700">{pts.toFixed(2)}</span>
                                  <span className="text-[10px] text-slate-400 font-mono hidden md:block">pts</span>
                                </div>
                              ) : <span className="text-slate-300 text-lg">-</span>}
                            </div>
                            <button onClick={() => removeSemester(sem.id)} className="md:opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all md:translate-x-2" title="Remove"><Icons.Trash2 size={16} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ACTION FOOTER */}
          <div className="bg-slate-50/80 p-4 md:p-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button onClick={activeTab === 'subject' ? addCourse : addSemester} className="w-full sm:w-auto flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-transform active:scale-95 hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg, ${activeTab === 'semester' ? '#059669' : colors.primary}, #1e293b)` }}><Icons.Plus size={18} /> {activeTab === 'subject' ? 'Add Subject' : 'Add Semester'}</button>
            <div className="flex gap-3 w-full sm:w-auto">
               <button onClick={shareResult} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 font-medium px-4 py-3 rounded-xl transition-all shadow-sm ${copied ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
                {copied ? <Icons.Check size={16} /> : <Icons.Share2 size={16} />} {copied ? 'Copied Link!' : 'Share Result'}
               </button>
               <button onClick={resetForm} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 font-medium px-4 py-3 rounded-xl transition-all shadow-sm">
                <Icons.RotateCcw size={16} /> <span className="sm:hidden md:inline">Reset</span>
              </button>
              <button onClick={() => setShowPolicy(true)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 border font-medium px-4 py-3 rounded-xl transition-all hover:bg-white shadow-sm"
                style={{ color: colors.primary, borderColor: colors.primary, backgroundColor: 'rgba(255,255,255,0.5)' }}><Icons.Info size={18} /> Policy</button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 md:mt-12 text-center pb-8">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full shadow-sm border border-slate-200/60 text-slate-600 text-xs md:text-sm hover:shadow-md transition-all cursor-default group">
                <div className="bg-slate-100 p-1.5 rounded-full group-hover:bg-blue-50 transition-colors"><Icons.User size={14} style={{ color: colors.primary }} /></div>
                <span>Developed by <span className="font-bold tracking-wide" style={{ color: colors.primary }}>Muhammad Wali</span></span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-3">© {new Date().getFullYear()} University of Gujrat Grading Utility</p>
        </div>
      </div>

      {showPolicy && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 md:p-5 text-white flex justify-between items-center relative overflow-hidden shrink-0" style={{ backgroundColor: colors.primary }}>
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"><Icons.GraduationCap size={120} /></div>
              <h3 className="font-bold text-lg md:text-xl flex items-center gap-3 relative z-10"><Icons.Calculator size={20} className="text-yellow-400" /> Grading Policy</h3>
              <button onClick={() => setShowPolicy(false)} className="hover:bg-white/20 p-2 rounded-full transition relative z-10"><Icons.X size={20} /></button>
            </div>
            <div className="overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-slate-300">
              <table className="w-full text-xs md:text-sm text-left">
                <thead className="bg-slate-50 text-slate-700 sticky top-0 shadow-sm z-10">
                  <tr>
                    <th className="px-4 py-3 font-bold border-b">Marks</th>
                    <th className="px-4 py-3 font-bold text-center border-b">Grade</th>
                    <th className="px-4 py-3 font-bold text-right border-b">Point</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-emerald-50"><td className="px-4 py-2 font-medium">85 - 100</td><td className="px-4 py-2 text-center font-bold text-emerald-700">A</td><td className="px-4 py-2 text-right font-mono font-bold">4.00</td></tr>
                  {[{ m: 84, p: 3.93 }, { m: 83, p: 3.87 }, { m: 82, p: 3.80 }, { m: 81, p: 3.73 }, { m: 80, p: 3.67 }, { m: 79, p: 3.60 }, { m: 78, p: 3.53 }, { m: 77, p: 3.47 }, { m: 76, p: 3.40 }, { m: 75, p: 3.33 }, { m: 74, p: 3.27 }, { m: 73, p: 3.20 }, { m: 72, p: 3.13 }, { m: 71, p: 3.07 }, { m: 70, p: 3.00 }, { m: 69, p: 2.90 }, { m: 68, p: 2.80 }, { m: 67, p: 2.70 }, { m: 66, p: 2.60 }, { m: 65, p: 2.50 }, { m: 64, p: 2.40 }, { m: 63, p: 2.30 }, { m: 62, p: 2.20 }, { m: 61, p: 2.10 }, { m: 60, p: 2.00 }, { m: 59, p: 1.90 }, { m: 58, p: 1.80 }, { m: 57, p: 1.70 }, { m: 56, p: 1.60 }, { m: 55, p: 1.50 }, { m: 54, p: 1.40 }, { m: 53, p: 1.30 }, { m: 52, p: 1.20 }, { m: 51, p: 1.10 }, { m: 50, p: 1.00 }]
                  .map((row) => {
                     let letter = 'F';
                     if (row.m >= 80) letter = 'A'; else if (row.m >= 65) letter = 'B'; else if (row.m >= 54) letter = 'C'; else if (row.m >= 50) letter = 'D';
                     return (
                      <tr key={row.m} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-1.5 text-slate-600">{row.m}</td>
                        <td className={`px-4 py-1.5 text-center font-bold ${letter === 'A' ? 'text-slate-800' : 'text-slate-400'}`}>{letter}</td>
                        <td className="px-4 py-1.5 text-right font-mono text-slate-600">{row.p.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                  <tr className="bg-red-50"><td className="px-4 py-2 font-medium text-red-600">Below 50</td><td className="px-4 py-2 text-center font-bold text-red-600">F</td><td className="px-4 py-2 text-right font-mono font-bold text-red-600">0.00</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradingPolicyCalculator;