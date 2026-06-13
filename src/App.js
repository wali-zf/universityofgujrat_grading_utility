import React, { useState, useEffect } from 'react';

// --- PREMIUM ICON SET ---
const Icons = {
  Plus: ({ size = 20, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Trash2: ({ size = 18, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>,
  Info: ({ size = 18, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
  GraduationCap: ({ size = 24, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>,
  X: ({ size = 20, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  RotateCcw: ({ size = 18, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>,
  Share2: ({ size = 18, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>,
  Check: ({ size = 18, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>,
  BookOpen: ({ size = 18, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
  Layers: ({ size = 18, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>,
  Sparkles: ({ size = 24, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>,
  Settings: ({ size = 18, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
  Github: ({ size = 24, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.57.1.78-.25.78-.56v-2.17c-3.2.69-3.88-1.38-3.88-1.38-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.97 10.97 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.08 0 4.42-2.7 5.39-5.27 5.67.41.35.77 1.04.77 2.1v3.11c0 .31.2.67.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  ),
  
  Linkedin: ({ size = 24, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.79v2.19h.07c.67-1.27 2.3-2.61 4.74-2.61C22.42 7.58 24 10.08 24 14.1V24h-5v-8.59c0-2.05-.04-4.69-2.86-4.69-2.87 0-3.31 2.24-3.31 4.55V24h-5V8z"/>
    </svg>
  ),
  User: ({ size = 14, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
  
};

// --- COLOR GRADING ENGINE ---
const getBadgeStyle = (letter) => {
  switch (letter) {
    case 'A': return 'bg-[#34C759]/10 border-[#34C759]/20 text-[#248A3D]'; // Apple Green
    case 'B': return 'bg-[#007AFF]/10 border-[#007AFF]/20 text-[#0056B3]'; // Apple Blue
    case 'C': return 'bg-[#FF9500]/10 border-[#FF9500]/20 text-[#B36800]'; // Apple Orange
    case 'D': return 'bg-[#FFCC00]/20 border-[#FFCC00]/40 text-[#B38F00]'; // Apple Yellow
    case 'F': return 'bg-[#FF3B30]/10 border-[#FF3B30]/20 text-[#C92A22]'; // Apple Red
    default: return 'bg-slate-50 border-slate-200 text-slate-500';
  }
};

const getSemesterBadgeStyle = (sgpa) => {
  if (sgpa >= 3.5) return 'bg-[#34C759]/10 border-[#34C759]/20 text-[#248A3D]';
  if (sgpa >= 3.0) return 'bg-[#007AFF]/10 border-[#007AFF]/20 text-[#0056B3]';
  if (sgpa >= 2.0) return 'bg-[#FF9500]/10 border-[#FF9500]/20 text-[#B36800]';
  if (sgpa > 0) return 'bg-[#FFCC00]/20 border-[#FFCC00]/40 text-[#B38F00]';
  return 'bg-[#FF3B30]/10 border-[#FF3B30]/20 text-[#C92A22]';
};

const App = () => {
  // --- URL PARSER & STATE MANAGEMENT ---
  const parseUrlState = () => {
    const defaultCourses = [
      { id: 1, name: '', credits: 3, marks: '', grade: '' },
      { id: 2, name: '', credits: 3, marks: '', grade: '' },
      { id: 3, name: '', credits: 3, marks: '', grade: '' },
    ];
    const defaultSemesters = [
      { id: 1, name: '', credits: '', sgpa: '' },
      { id: 2, name: '', credits: '', sgpa: '' },
    ];
    
    try {
      const hash = window.location.hash.substring(1);
      if (!hash) return { tab: 'subject', calcMode: 'marks', courses: defaultCourses, includeCGPA: false, currentCredits: '', currentCGPA: '', semesters: defaultSemesters };
      const decoded = atob(hash);

      if (decoded.startsWith('~')) {
         const parsedSems = decoded.substring(1).split(';').map(str => {
           const [n, sgpa, c] = str.split('|');
           return { id: Date.now() + Math.random(), name: n || '', sgpa: sgpa || '', credits: c || '' };
         });
         return { tab: 'semester', calcMode: 'marks', courses: defaultCourses, includeCGPA: false, currentCredits: '', currentCGPA: '', semesters: parsedSems };
      }

      if (decoded.startsWith('!')) {
         const parts = decoded.substring(1).split(';');
         const headerData = parts[0].split(',');
         const includeCGPA = headerData[0] === '1';
         const currentCredits = headerData[1] || '';
         const currentCGPA = headerData[2] || '';
         const calcMode = headerData[3] === 'grades' ? 'grades' : 'marks';
         const parsedCourses = parts.slice(1).map(str => {
           const [n, c, m, g] = str.split('|');
           return { id: Date.now() + Math.random(), name: n || '', credits: c || 0, marks: m || '', grade: g || '' };
         });
         return { tab: 'subject', calcMode, courses: parsedCourses, includeCGPA, currentCredits, currentCGPA, semesters: defaultSemesters };
      }
    } catch (e) { console.log('No valid state in URL'); }
    return { tab: 'subject', calcMode: 'marks', courses: defaultCourses, includeCGPA: false, currentCredits: '', currentCGPA: '', semesters: defaultSemesters };
  };

  const initialState = parseUrlState();
  const [activeTab, setActiveTab] = useState(initialState.tab); 
  const [calcMode, setCalcMode] = useState(initialState.calcMode); 
  const [courses, setCourses] = useState(initialState.courses);
  const [semesters, setSemesters] = useState(initialState.semesters);
  const [includeCGPA, setIncludeCGPA] = useState(initialState.includeCGPA);
  const [currentCredits, setCurrentCredits] = useState(initialState.currentCredits);
  const [currentCGPA, setCurrentCGPA] = useState(initialState.currentCGPA);
  
  const [showPolicy, setShowPolicy] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Sync to URL
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let finalStr = '';
      if (activeTab === 'subject') {
        const coursesStr = courses.map(c => `${(c.name || '').replace(/[|;!~]/g, ' ')}|${c.credits}|${c.marks}|${c.grade}`).join(';');
        const headerStr = `!${includeCGPA ? '1' : '0'},${currentCredits},${currentCGPA},${calcMode}`;
        finalStr = `${headerStr};${coursesStr}`;
      } else {
        const semsStr = semesters.map(s => `${(s.name || '').replace(/[|;!~]/g, ' ')}|${s.sgpa}|${s.credits}`).join(';');
        finalStr = `~${semsStr}`;
      }
      window.history.replaceState(null, '', `#${btoa(finalStr)}`);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [courses, includeCGPA, currentCredits, currentCGPA, activeTab, semesters, calcMode]);

  // --- BUSINESS LOGIC ---
  const getExactGradeDetails = (marks) => {
    if (marks === '' || marks === null) return { point: 0, letter: '-' };
    const m = Math.round(Number(marks));
    if (m >= 85) return { point: 4.00, letter: 'A' };
    if (m < 50) return { point: 0.00, letter: 'F' };
    const scale = {
      84: 3.93, 83: 3.87, 82: 3.80, 81: 3.73, 80: 3.67, 79: 3.60, 78: 3.53, 77: 3.47, 76: 3.40, 75: 3.33, 74: 3.27, 73: 3.20,
      72: 3.13, 71: 3.07, 70: 3.00, 69: 2.90, 68: 2.80, 67: 2.70, 66: 2.60, 65: 2.50, 64: 2.40, 63: 2.30, 62: 2.20, 61: 2.10, 
      60: 2.00, 59: 1.90, 58: 1.80, 57: 1.70, 56: 1.60, 55: 1.50, 54: 1.40, 53: 1.30, 52: 1.20, 51: 1.10, 50: 1.00
    };
    let letter = 'F';
    if (m >= 80) letter = 'A'; else if (m >= 65) letter = 'B'; else if (m >= 54) letter = 'C'; else if (m >= 50) letter = 'D';
    return { point: scale[m] !== undefined ? scale[m] : 0.00, letter };
  };

  const getStandardGradePoint = (letter) => {
    switch(letter) { case 'A': return 4.00; case 'B': return 3.00; case 'C': return 2.00; case 'D': return 1.00; case 'F': return 0.00; default: return 0.00; }
  };

  const addCourse = () => setCourses([...courses, { id: Date.now(), name: '', credits: 3, marks: '', grade: '' }]);
  const removeCourse = (id) => { if (courses.length > 1) setCourses(courses.filter(c => c.id !== id)); };
  
  const updateCourse = (id, field, value) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const safeUpdateCourse = (id, field, value, maxVal) => {
    if (value === '') return updateCourse(id, field, '');
    let num = parseFloat(value);
    if (isNaN(num)) return;
    if (num < 0) num = 0;
    if (maxVal && num > maxVal) num = maxVal;
    updateCourse(id, field, num);
  };

  const addSemester = () => setSemesters([...semesters, { id: Date.now(), name: '', credits: '', sgpa: '' }]);
  const removeSemester = (id) => { if (semesters.length > 1) setSemesters(semesters.filter(s => s.id !== id)); };
  
  const updateSemester = (id, field, value) => {
    setSemesters(semesters.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const safeUpdateSemester = (id, field, value, maxVal) => {
    if (value === '') return updateSemester(id, field, '');
    let num = parseFloat(value);
    if (isNaN(num)) return;
    if (num < 0) num = 0;
    if (maxVal && num > maxVal) num = maxVal;
    updateSemester(id, field, num);
  };

  // Fixed Reset Function with Modal logic (No more blocked alerts)
  const executeReset = () => {
    if (activeTab === 'subject') {
      setCourses([{ id: 1, name: '', credits: 3, marks: '', grade: '' }, { id: 2, name: '', credits: 3, marks: '', grade: '' }, { id: 3, name: '', credits: 3, marks: '', grade: '' }]);
      setIncludeCGPA(false); setCurrentCredits(''); setCurrentCGPA('');
    } else {
      setSemesters([{ id: 1, name: '', credits: '', sgpa: '' }, { id: 2, name: '', credits: '', sgpa: '' }]);
    }
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
    setShowResetModal(false);
  };

  // Fixed Share Function with Clipboard Fallback
  const shareResult = () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true); setTimeout(() => setCopied(false), 2000);
        }).catch(() => fallbackCopy(url));
      } else {
        fallbackCopy(url);
      }
    } catch (err) {
      fallbackCopy(url);
    }
  };

  const fallbackCopy = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    textArea.remove();
  };

  // Stats Logic
  const calculateSubjectStats = () => {
    let currentPoints = 0; let semesterCredits = 0;
    courses.forEach(c => {
      const cr = parseFloat(c.credits) || 0; 
      if (calcMode === 'marks') {
        if (cr > 0 && c.marks !== '') { const { point } = getExactGradeDetails(c.marks); currentPoints += point * cr; semesterCredits += cr; }
      } else {
        if (cr > 0 && c.grade !== '') { const point = getStandardGradePoint(c.grade); currentPoints += point * cr; semesterCredits += cr; }
      }
    });

    const sgpa = semesterCredits === 0 ? 0 : (currentPoints / semesterCredits);
    let cgpa = sgpa; let totalCreditsOverall = semesterCredits;
    
    if (includeCGPA) {
      const pCredits = parseFloat(currentCredits) || 0; const pCGPA = parseFloat(currentCGPA) || 0;
      totalCreditsOverall = pCredits + semesterCredits;
      cgpa = totalCreditsOverall > 0 ? ((pCredits * pCGPA) + currentPoints) / totalCreditsOverall : 0;
    }
    return { sgpa: sgpa.toFixed(2), cgpa: cgpa.toFixed(2), semesterCredits, totalCreditsOverall };
  };

  const calculateSemesterStats = () => {
    let totalPoints = 0; let totalCredits = 0;
    semesters.forEach(s => {
      const cr = parseFloat(s.credits) || 0; const sgpa = parseFloat(s.sgpa) || 0;
      if (cr > 0 && sgpa > 0) { totalPoints += (sgpa * cr); totalCredits += cr; }
    });
    return { cgpa: totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00', totalCredits };
  };

  const subjectStats = calculateSubjectStats();
  const semesterStats = calculateSemesterStats();
  
  const displayValue = activeTab === 'subject' ? (includeCGPA ? parseFloat(subjectStats.cgpa) : parseFloat(subjectStats.sgpa)) : parseFloat(semesterStats.cgpa);
  const displayCredits = activeTab === 'subject' ? (includeCGPA ? subjectStats.totalCreditsOverall : subjectStats.semesterCredits) : semesterStats.totalCredits;

  useEffect(() => {
    if (displayValue >= 3.5 && displayCredits > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowConfetti(false);
    }
  }, [displayValue, displayCredits]);

  const Confetti = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[100]">
      {[...Array(80)].map((_, i) => (
        <div key={i} className="absolute animate-fall" style={{ left: `${Math.random() * 100}%`, top: `-5%`, animationDuration: `${Math.random() * 2 + 2}s`, animationDelay: `${Math.random() * 0.5}s`, width: `${Math.random() * 6 + 4}px`, height: `${Math.random() * 10 + 6}px`, background: ['#F59E0B', '#3B82F6', '#10B981', '#6366F1', '#8B5CF6'][Math.floor(Math.random() * 5)], transform: `rotate(${Math.random() * 360}deg)`, borderRadius: i % 3 === 0 ? '50%' : '2px' }} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F2F2F7] font-sans selection:bg-[#007AFF]/20 text-[#1C1C1E]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
        
        /* Clean Inputs */
        input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
        select { -webkit-appearance: none; -moz-appearance: none; appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1.2em; }
        
        /* Premium Animations */
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
        @keyframes fall { 0% { transform: translateY(-20px) rotate(0deg); opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fall { animation: fall linear forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        /* Glass & Shadows */
        .glass-panel { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.5); }
        .premium-shadow { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); }
        .premium-shadow-hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025); }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }
      `}</style>

      {showConfetti && <Confetti />}

      {/* --- BACKGROUND BLOBS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex justify-center">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/10 blur-[100px] animate-[float_10s_ease-in-out_infinite]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-amber-400/10 blur-[100px] animate-[float_12s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* --- PERFECT CUSTOM CSS UOG LOGO NAVBAR --- */}
      <header className="sticky top-0 z-40 glass-panel border-b border-slate-200/50 transition-all">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3 select-none">
            {/* Logo Graphic */}
            <div className="relative flex items-center justify-center bg-[#2A388F]/10 rounded-xl rounded-tr-3xl px-2.5 py-1.5 border border-[#2A388F]/20">
              <span className="relative text-2xl md:text-3xl font-black text-[#2A388F] tracking-tighter z-10">UOG</span>
              <Icons.Settings className="absolute -top-2.5 -right-2.5 text-[#EAA92A] animate-[spin_4s_linear_infinite] drop-shadow-md" size={22} />
            </div>
            {/* Logo Text */}
            <div className="flex flex-col justify-center">
              <span className="font-bold text-[#2A388F] leading-none tracking-tight text-[11px] md:text-xs uppercase">University Of</span>
              <span className="font-black text-[#2A388F] leading-none tracking-tight text-lg md:text-xl uppercase mt-0.5">Gujrat</span>
              <span className="text-[7px] md:text-[8px] uppercase font-bold tracking-[0.2em] text-[#EAA92A] mt-1">A World Class University</span>
            </div>
          </div>

          <button onClick={() => setShowPolicy(true)} className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#2A388F] bg-white/50 hover:bg-white border border-slate-200/60 px-3 py-1.5 rounded-full transition-all premium-shadow">
            <Icons.Info size={14} /> <span className="hidden sm:inline">Grading Policy</span>
          </button>
        </div>
      </header>

      <main className={`relative z-10 max-w-5xl mx-auto px-4 md:px-6 pt-8 pb-32 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* --- HERO SCORECARD (BENTO STYLE) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Main GPA Display */}
          <div className="md:col-span-2 bg-slate-900 rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-2xl shadow-indigo-900/20 flex flex-col justify-between">
            {/* Glowing Accent */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/30 rounded-full blur-[60px] pointer-events-none"></div>
            
            <div className="relative z-10 flex justify-between items-start">
               <div>
                  <h2 className="text-indigo-300 text-xs md:text-sm font-bold uppercase tracking-widest mb-1">
                    {activeTab === 'semester' ? 'Degree CGPA' : (includeCGPA ? 'Estimated CGPA' : 'Semester GPA')}
                  </h2>
                  <div className="flex items-start gap-3 mt-2">
                    <span className="text-7xl md:text-8xl font-black tracking-tighter leading-none text-white drop-shadow-md">
                      {displayValue.toFixed(2)}
                    </span>
                    {displayValue >= 3.5 && displayCredits > 0 && <Icons.Sparkles className="text-amber-400 w-8 h-8 animate-pulse mt-2" />}
                  </div>
               </div>
            </div>

            <div className="relative z-10 flex items-center gap-4 mt-10">
               <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest block mb-0.5">Total Credits</span>
                  <span className="text-white font-semibold text-xl">{displayCredits}</span>
               </div>
               
               {activeTab === 'subject' && includeCGPA && (
                 <div className="bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 rounded-2xl px-5 py-3 animate-fade-in-up">
                    <span className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest block mb-0.5">This SGPA ({subjectStats.semesterCredits} Cr)</span>
                    <span className="text-white font-semibold text-xl">{subjectStats.sgpa}</span>
                 </div>
               )}
            </div>
          </div>

          {/* Quick Controls Card */}
          <div className="md:col-span-1 bg-white rounded-[2rem] p-6 premium-shadow flex flex-col border border-slate-200/60">
             <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Calculation Mode</h3>
             
             {/* Tab Switcher */}
             <div className="bg-slate-100 p-1.5 rounded-xl flex w-full mb-6">
                <button onClick={() => setActiveTab('subject')} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex justify-center items-center gap-2 ${activeTab === 'subject' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                   <Icons.BookOpen size={16} /> Subject
                </button>
                <button onClick={() => setActiveTab('semester')} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex justify-center items-center gap-2 ${activeTab === 'semester' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                   <Icons.Layers size={16} /> Semester
                </button>
             </div>

             {/* Subject Specific Controls */}
             {activeTab === 'subject' && (
               <div className="space-y-5 flex-1 animate-fade-in-up">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-2 block">Input Method</label>
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                      <button onClick={() => setCalcMode('marks')} className={`flex-1 py-2 rounded-md text-xs font-semibold transition-all ${calcMode === 'marks' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Marks</button>
                      <button onClick={() => setCalcMode('grades')} className={`flex-1 py-2 rounded-md text-xs font-semibold transition-all ${calcMode === 'grades' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Grades</button>
                    </div>
                  </div>

                  <div>
                    <div onClick={() => setIncludeCGPA(!includeCGPA)} className="flex items-center justify-between cursor-pointer group p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-100 transition-colors">
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-900 transition-colors">Add Past CGPA</span>
                      <div className={`w-11 h-6 rounded-full transition-colors duration-300 ease-in-out relative ${includeCGPA ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${includeCGPA ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                  </div>
               </div>
             )}

             {/* Semantic Info */}
             {activeTab === 'semester' && (
               <div className="flex-1 flex items-center justify-center text-center p-4 bg-slate-50 rounded-xl border border-slate-100 animate-fade-in-up">
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">Add your previous semester SGPAs below to calculate your final Degree CGPA.</p>
               </div>
             )}
          </div>
        </div>

        {/* --- DYNAMIC SECTION --- */}
        
        {/* Past CGPA Inputs (If toggled) */}
        {activeTab === 'subject' && includeCGPA && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 animate-fade-in-up">
             <div className="bg-white rounded-2xl p-4 md:p-5 flex items-center gap-4 premium-shadow border border-slate-200/60">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0"><Icons.GraduationCap size={20} /></div>
                <div className="flex-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Previous CGPA</label>
                  <input type="number" step="0.01" value={currentCGPA} onChange={e => setCurrentCGPA(e.target.value)} 
                    className="w-full bg-transparent text-xl md:text-2xl font-black text-slate-800 outline-none placeholder-slate-300" placeholder="e.g. 3.25" />
                </div>
             </div>
             <div className="bg-white rounded-2xl p-4 md:p-5 flex items-center gap-4 premium-shadow border border-slate-200/60">
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0"><Icons.Layers size={20} /></div>
                <div className="flex-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Total Earned Credits</label>
                  <input type="number" value={currentCredits} onChange={e => setCurrentCredits(e.target.value)} 
                    className="w-full bg-transparent text-xl md:text-2xl font-black text-slate-800 outline-none placeholder-slate-300" placeholder="e.g. 65" />
                </div>
             </div>
          </div>
        )}

        {/* Warning Banner */}
        {activeTab === 'subject' && calcMode === 'grades' && (
          <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-4 mb-6 flex items-start gap-3 animate-fade-in-up">
            <div className="bg-amber-100 p-1.5 rounded-full text-amber-600 mt-0.5 shrink-0"><Icons.Info size={16} /></div>
            <p className="text-sm font-medium text-amber-900 leading-relaxed">
              <strong>Estimate Mode:</strong> Standard averages (A=4.0, B=3.0) are used here. For 100% official UOG accuracy based on your exact marks (e.g. 78 marks = 3.53), please switch to <span className="underline cursor-pointer" onClick={()=>setCalcMode('marks')}>Exact Marks mode</span>.
            </p>
          </div>
        )}

        {/* --- LIST CONTAINER (BENTO STYLE) --- */}
        <div className="bg-white rounded-[2rem] premium-shadow border border-slate-200/60 overflow-hidden animate-fade-in-up">
           
           {/* Header Desktop */}
           <div className="hidden md:grid grid-cols-12 gap-4 p-5 bg-slate-50/80 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-5 pl-2">{activeTab === 'subject' ? 'Subject Title' : 'Semester Title'}</div>
              <div className="col-span-2 text-center">{activeTab === 'subject' ? 'Cr. Hr' : 'Credits'}</div>
              <div className="col-span-3 text-center">{activeTab === 'subject' ? (calcMode === 'marks' ? 'Marks (%)' : 'Select Grade') : 'SGPA'}</div>
              <div className="col-span-2 text-center">Result</div>
           </div>

           {/* Mobile Header */}
           <div className="md:hidden px-5 py-4 bg-slate-50/80 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
              {activeTab === 'subject' ? 'Enter Course Details' : 'Enter Semester Details'}
           </div>

           {/* Content List */}
           <div className="divide-y divide-slate-100">
              {(activeTab === 'subject' ? courses : semesters).map((item, index) => {
                
                // Logic based on tab
                let isFilled = false, displayLetter = '-', displayPoint = 0, pts = 0;
                
                if (activeTab === 'subject') {
                  const isMarksMode = calcMode === 'marks';
                  const exactDetail = getExactGradeDetails(item.marks);
                  displayLetter = isMarksMode ? exactDetail.letter : (item.grade || '-');
                  displayPoint = isMarksMode ? exactDetail.point : getStandardGradePoint(item.grade);
                  isFilled = isMarksMode ? item.marks !== '' : item.grade !== '';
                } else {
                  pts = (parseFloat(item.sgpa) || 0) * (parseFloat(item.credits) || 0);
                  isFilled = item.sgpa !== '' && item.credits !== '';
                }

                return (
                  <div key={item.id} className="p-5 md:p-6 flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6 items-center group hover:bg-slate-50/50 transition-colors relative">
                     
                     {/* 1. Name Input */}
                     <div className="w-full md:col-span-5 flex items-center gap-4">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm flex items-center justify-center font-bold group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">{index + 1}</div>
                        <input type="text" value={item.name} onChange={(e) => activeTab === 'subject' ? updateCourse(item.id, 'name', e.target.value) : updateSemester(item.id, 'name', e.target.value)}
                          className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-800 font-semibold placeholder-slate-300 text-lg outline-none" 
                          placeholder={activeTab === 'subject' ? `Subject ${index + 1}` : `Semester ${index + 1}`} />
                     </div>
                     
                     {/* 2. Mobile Grid Layout */}
                     <div className="w-full md:col-span-7 grid grid-cols-12 gap-3 items-center">
                        
                        {/* Credits */}
                        <div className="col-span-4 md:col-span-4">
                           <label className="md:hidden text-[10px] uppercase font-bold text-slate-400 mb-1.5 block text-center tracking-wide">Credits</label>
                           <input type="number" value={item.credits} onChange={(e) => activeTab === 'subject' ? safeUpdateCourse(item.id, 'credits', e.target.value) : safeUpdateSemester(item.id, 'credits', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-center shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white font-bold text-slate-800 transition-all text-base" placeholder="3" />
                        </div>
                        
                        {/* Primary Input (Marks/Grade/SGPA) */}
                        <div className="col-span-4 md:col-span-4 relative">
                           <label className="md:hidden text-[10px] uppercase font-bold text-slate-400 mb-1.5 block text-center tracking-wide">
                             {activeTab === 'subject' ? (calcMode === 'marks' ? 'Marks' : 'Grade') : 'SGPA'}
                           </label>
                           
                           {activeTab === 'subject' ? (
                             calcMode === 'marks' ? (
                               <input type="number" value={item.marks} onChange={(e) => safeUpdateCourse(item.id, 'marks', e.target.value, 100)}
                                className={`w-full px-4 py-3 text-center border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all font-bold text-base ${item.marks === '' ? 'bg-slate-50/50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 focus:bg-white' : 'bg-white border-indigo-300 ring-2 ring-indigo-50 text-indigo-700'}`} placeholder="85" />
                             ) : (
                               <select value={item.grade} onChange={(e) => updateCourse(item.id, 'grade', e.target.value)}
                                className={`w-full pl-4 pr-8 py-3 text-center border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all font-bold text-base cursor-pointer ${item.grade === '' ? 'bg-slate-50/50 border-slate-200 text-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 focus:bg-white' : 'bg-white border-indigo-300 ring-2 ring-indigo-50 text-indigo-700'}`}>
                                 <option value="">-</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="F">F</option>
                               </select>
                             )
                           ) : (
                             <input type="number" step="0.01" value={item.sgpa} onChange={(e) => safeUpdateSemester(item.id, 'sgpa', e.target.value, 4.0)}
                                className={`w-full px-4 py-3 text-center border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all font-bold text-base ${item.sgpa === '' ? 'bg-slate-50/50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 focus:bg-white' : 'bg-white border-indigo-300 ring-2 ring-indigo-50 text-indigo-700'}`} placeholder="3.50" />
                           )}
                        </div>

                        {/* Result Badge Output */}
                        <div className="col-span-3 md:col-span-3 flex justify-center pl-2 md:pl-0">
                           <label className="md:hidden text-[10px] uppercase font-bold text-slate-400 mb-1.5 block text-center tracking-wide absolute -top-5">Result</label>
                           {isFilled ? (
                             <div className={`flex flex-col items-center justify-center w-full py-2 rounded-xl border ${activeTab === 'subject' ? getBadgeStyle(displayLetter) : getSemesterBadgeStyle(parseFloat(item.sgpa))}`}>
                               <span className="font-black text-xl leading-none">
                                 {activeTab === 'subject' ? displayLetter : pts.toFixed(1)}
                               </span>
                               <span className="text-[10px] font-bold mt-1 opacity-80">
                                 {activeTab === 'subject' ? `${displayPoint.toFixed(2)} pt` : 'pts'}
                               </span>
                             </div>
                           ) : (
                             <div className="flex flex-col items-center justify-center w-full py-2 rounded-xl border border-dashed border-slate-200 text-slate-300 bg-slate-50/30">
                               <span className="font-black text-xl leading-none">-</span>
                             </div>
                           )}
                        </div>
                        
                        {/* Remove Action */}
                        <div className="col-span-1 md:col-span-1 flex justify-end">
                           <button onClick={() => activeTab === 'subject' ? removeCourse(item.id) : removeSemester(item.id)} 
                             className="text-slate-300 hover:text-rose-500 p-2 rounded-lg hover:bg-rose-50 transition-colors" aria-label="Remove item">
                             <Icons.Trash2 />
                           </button>
                        </div>
                     </div>
                  </div>
                );
              })}
           </div>

           {/* Add Button Row (Inside the Card) */}
           <div className="p-4 md:p-5 bg-slate-50/50 border-t border-slate-100">
             <button onClick={activeTab === 'subject' ? addCourse : addSemester} 
               className="w-full py-3.5 border-2 border-dashed border-slate-200 hover:border-indigo-400 text-slate-500 hover:text-indigo-600 font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-indigo-50/50 active:scale-[0.99]">
               <Icons.Plus size={18} /> Add {activeTab === 'subject' ? 'Subject' : 'Semester'}
             </button>
           </div>
        </div>

      </main>

      {/* --- IN-FLOW BOTTOM ACTION BAR --- */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 pb-20">
         <div className="flex flex-col md:flex-row gap-3">
            <button onClick={shareResult} className={`flex-1 md:flex-none flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-2xl transition-all premium-shadow-hover active:scale-95 ${copied ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-white text-slate-700 hover:text-indigo-600 border border-slate-200'}`}>
              {copied ? <Icons.Check size={20} /> : <Icons.Share2 size={20} />} 
              <span>{copied ? 'Link Copied to Clipboard!' : 'Share Result Link'}</span>
            </button>
            <button onClick={() => setShowResetModal(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-slate-600 hover:text-rose-600 border border-slate-200 font-bold py-4 px-6 rounded-2xl transition-all premium-shadow-hover active:scale-95">
              <Icons.RotateCcw size={18} /> <span>Reset Calculator</span>
            </button>
         </div>

         {/* Footer */}
         <div className="mt-16 text-center">
             <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 text-slate-500 text-xs font-medium">
                 <div className="bg-indigo-50 p-1 rounded-full text-indigo-600"><Icons.User size={12} /></div>
                 <span>Developed by <span className="font-bold text-slate-800">Muhammad Wali</span></span>
             </div>
             <div className="flex justify-center gap-5 mt-4">
    <a
      href="https://github.com/wali-zf"
      target="_blank"
      rel="noopener noreferrer"
      className="text-slate-500 hover:text-black transition-colors"
    >
      <Icons.Github size={18} />
    </a>

    <a
      href="https://www.linkedin.com/in/wali-zf/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-slate-500 hover:text-[#0077B5] transition-colors"
    >
      <Icons.Linkedin size={18} />
    </a>
  </div>
             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-4 mb-2">University of Gujrat Utility</p>
         </div>
      </div>

      {/* --- PREMIUM RESET CONFIRM MODAL --- */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in-up" onClick={() => setShowResetModal(false)}></div>
          <div className="bg-white w-full max-w-sm rounded-[24px] shadow-2xl overflow-hidden relative z-10 animate-fade-in-up flex flex-col p-6 text-center">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icons.RotateCcw size={28} />
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-2">Reset Calculator?</h3>
            <p className="text-sm text-slate-500 mb-8">This will clear all your current subjects, semesters, and marks. This action cannot be undone.</p>
            <div className="flex gap-3 w-full">
              <button onClick={() => setShowResetModal(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl transition-colors">Cancel</button>
              <button onClick={executeReset} className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3.5 rounded-xl shadow-md shadow-rose-600/20 transition-colors">Yes, Reset</button>
            </div>
          </div>
        </div>
      )}

      {/* --- PREMIUM POLICY MODAL --- */}
      {showPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in-up" onClick={() => setShowPolicy(false)}></div>
          
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-fade-in-up flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><Icons.GraduationCap size={20} /></div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 leading-tight">UOG Grading Policy</h3>
                  <p className="text-xs font-medium text-slate-500">Official Grade Points Table</p>
                </div>
              </div>
              <button onClick={() => setShowPolicy(false)} className="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors"><Icons.X size={20} /></button>
            </div>
            
            {/* Modal Content */}
            <div className="overflow-y-auto bg-slate-50/50 p-4 sm:p-6">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Marks (%)</th>
                      <th className="px-6 py-4 text-center">Grade</th>
                      <th className="px-6 py-4 text-right">Point</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-emerald-50/50"><td className="px-6 py-3 font-semibold text-slate-800">85 - 100</td><td className="px-6 py-3 text-center font-black text-emerald-600">A</td><td className="px-6 py-3 text-right font-mono font-bold text-slate-800">4.00</td></tr>
                    {[{ m: 84, p: 3.93 }, { m: 83, p: 3.87 }, { m: 82, p: 3.80 }, { m: 81, p: 3.73 }, { m: 80, p: 3.67 }, { m: 79, p: 3.60 }, { m: 78, p: 3.53 }, { m: 77, p: 3.47 }, { m: 76, p: 3.40 }, { m: 75, p: 3.33 }, { m: 74, p: 3.27 }, { m: 73, p: 3.20 }, { m: 72, p: 3.13 }, { m: 71, p: 3.07 }, { m: 70, p: 3.00 }, { m: 69, p: 2.90 }, { m: 68, p: 2.80 }, { m: 67, p: 2.70 }, { m: 66, p: 2.60 }, { m: 65, p: 2.50 }, { m: 64, p: 2.40 }, { m: 63, p: 2.30 }, { m: 62, p: 2.20 }, { m: 61, p: 2.10 }, { m: 60, p: 2.00 }, { m: 59, p: 1.90 }, { m: 58, p: 1.80 }, { m: 57, p: 1.70 }, { m: 56, p: 1.60 }, { m: 55, p: 1.50 }, { m: 54, p: 1.40 }, { m: 53, p: 1.30 }, { m: 52, p: 1.20 }, { m: 51, p: 1.10 }, { m: 50, p: 1.00 }]
                    .map((row) => {
                       let letter = 'F';
                       if (row.m >= 80) letter = 'A'; else if (row.m >= 65) letter = 'B'; else if (row.m >= 54) letter = 'C'; else if (row.m >= 50) letter = 'D';
                       return (
                        <tr key={row.m} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-2.5 font-medium text-slate-600">{row.m}</td>
                          <td className={`px-6 py-2.5 text-center font-bold ${letter === 'A' ? 'text-slate-800' : 'text-slate-400'}`}>{letter}</td>
                          <td className="px-6 py-2.5 text-right font-mono font-medium text-slate-600">{row.p.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                    <tr className="bg-rose-50/50"><td className="px-6 py-3 font-semibold text-rose-700">Below 50</td><td className="px-6 py-3 text-center font-black text-rose-600">F</td><td className="px-6 py-3 text-right font-mono font-bold text-rose-700">0.00</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;