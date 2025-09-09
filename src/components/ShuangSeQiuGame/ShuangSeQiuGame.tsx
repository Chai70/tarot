import React, { useState, useEffect, useCallback } from 'react';
import './ShuangSeQiuGame.css';

// 双色球规则: 6个红球 (1-33), 1个蓝球 (1-16)
const initialRedBalls = Array.from({ length: 33 }, (_, i) => i + 1);
const initialBlueBalls = Array.from({ length: 16 }, (_, i) => i + 1);

type BallType = 'red' | 'blue';
interface BallInContainer {
  number: number;
  type: BallType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  id: string;
}

interface AnimatingBall {
  number: number;
  type: BallType;
  id: string;
}

interface ShuangSeQiuRecord {
  id: string;
  date: string;
  redBalls: number[];
  blueBalls: number[];
  isMemorized: boolean;
  officialRedBalls?: number[];
  officialBlueBalls?: number[];
  officialDate?: string;
}

interface RecordsManagerProps {
  records: ShuangSeQiuRecord[];
  currentPage: number;
  recordsPerPage: number;
  totalPages: number;
  onClose: () => void;
  onEdit: (record: ShuangSeQiuRecord) => void;
  onDelete: (recordId: string) => void;
  onAddOfficial: (recordId: string, officialData: { date: string; redBalls: number[]; blueBalls: number[] }) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  calculateMatches: (record: ShuangSeQiuRecord) => { redMatches: number; blueMatches: number } | null;
}

interface EditRecordDialogProps {
  record: ShuangSeQiuRecord;
  onSave: (record: ShuangSeQiuRecord) => void;
  onClose: () => void;
}

// 记录管理组件
const RecordsManager: React.FC<RecordsManagerProps> = ({
  records, currentPage, recordsPerPage, totalPages, onClose, onEdit, onDelete, 
  onAddOfficial, onNextPage, onPrevPage, calculateMatches
}) => {
  const [showOfficialInput, setShowOfficialInput] = useState<string | null>(null);
  const [officialInput, setOfficialInput] = useState({ date: '', redBalls: '', blueBalls: '' });
  
  const currentRecords = records.slice(
    currentPage * recordsPerPage,
    (currentPage + 1) * recordsPerPage
  );
  
  const handleAddOfficial = (recordId: string) => {
    const redBalls = officialInput.redBalls.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    const blueBalls = officialInput.blueBalls.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    
    if (redBalls.length === 6 && blueBalls.length === 1) {
      onAddOfficial(recordId, {
        date: officialInput.date,
        redBalls,
        blueBalls
      });
      setShowOfficialInput(null);
      setOfficialInput({ date: '', redBalls: '', blueBalls: '' });
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal records-modal">
        <div className="modal-header">
          <h3>记录管理 ({records.length}条记录)</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="records-list">
          {currentRecords.map((record) => {
            const matches = calculateMatches(record);
            return (
              <div key={record.id} className="record-item">
                <div className="record-main">
                  <div className="record-date">{record.date}</div>
                  <div className="record-balls">
                    <div className="balls-group">
                      <span className="label">我的号码:</span>
                      {record.redBalls.map(ball => (
                        <span key={ball} className="ball red small">{ball}</span>
                      ))}
                      {record.blueBalls.map(ball => (
                        <span key={ball} className="ball blue small">{ball}</span>
                      ))}
                    </div>
                    {record.officialRedBalls && record.officialBlueBalls && (
                      <div className="balls-group">
                        <span className="label">官方号码:</span>
                        {record.officialRedBalls.map(ball => (
                          <span key={ball} className="ball red small">{ball}</span>
                        ))}
                        {record.officialBlueBalls.map(ball => (
                          <span key={ball} className="ball blue small">{ball}</span>
                        ))}
                        <span className="official-date">({record.officialDate})</span>
                      </div>
                    )}
                    {matches && (
                      <div className="match-result">
                        中奖情况: 红球{matches.redMatches}个, 蓝球{matches.blueMatches}个
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="record-actions">
                  {!record.officialRedBalls && (
                    <button 
                      className="action-btn add-official"
                      onClick={() => setShowOfficialInput(record.id)}
                    >
                      添加官方结果
                    </button>
                  )}
                  <button 
                    className="action-btn edit"
                    onClick={() => onEdit(record)}
                  >
                    修改
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => onDelete(record.id)}
                  >
                    删除
                  </button>
                </div>
                
                {showOfficialInput === record.id && (
                  <div className="official-input">
                    <div className="input-row">
                      <label>开奖日期:</label>
                      <input
                        type="date"
                        value={officialInput.date}
                        onChange={(e) => setOfficialInput(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    <div className="input-row">
                      <label>红球:</label>
                      <input
                        type="text"
                        placeholder="例: 1,5,12,23,30,33"
                        value={officialInput.redBalls}
                        onChange={(e) => setOfficialInput(prev => ({ ...prev, redBalls: e.target.value }))}
                      />
                    </div>
                    <div className="input-row">
                      <label>蓝球:</label>
                      <input
                        type="text"
                        placeholder="例: 8"
                        value={officialInput.blueBalls}
                        onChange={(e) => setOfficialInput(prev => ({ ...prev, blueBalls: e.target.value }))}
                      />
                    </div>
                    <div className="input-actions">
                      <button onClick={() => handleAddOfficial(record.id)}>确认</button>
                      <button onClick={() => setShowOfficialInput(null)}>取消</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={onPrevPage} 
              disabled={currentPage === 0}
              className="page-btn"
            >
              上一页
            </button>
            <span className="page-info">
              第 {currentPage + 1} 页 / 共 {totalPages} 页
            </span>
            <button 
              onClick={onNextPage} 
              disabled={currentPage >= totalPages - 1}
              className="page-btn"
            >
              下一页
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 编辑记录对话框
const EditRecordDialog: React.FC<EditRecordDialogProps> = ({ record, onSave, onClose }) => {
  const [editForm, setEditForm] = useState({
    date: record.date,
    redBalls: record.redBalls.join(','),
    blueBalls: record.blueBalls.join(','),
    officialDate: record.officialDate || '',
    officialRedBalls: record.officialRedBalls?.join(',') || '',
    officialBlueBalls: record.officialBlueBalls?.join(',') || ''
  });
  
  const handleSave = () => {
    const redBalls = editForm.redBalls.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    const blueBalls = editForm.blueBalls.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    
    if (redBalls.length === 6 && blueBalls.length === 1) {
      const updatedRecord: ShuangSeQiuRecord = {
        ...record,
        date: editForm.date,
        redBalls: redBalls.sort((a, b) => a - b),
        blueBalls: blueBalls.sort((a, b) => a - b)
      };
      
      // 处理官方结果
      if (editForm.officialRedBalls && editForm.officialBlueBalls) {
        const officialRed = editForm.officialRedBalls.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
        const officialBlue = editForm.officialBlueBalls.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
        
        if (officialRed.length === 6 && officialBlue.length === 1) {
          updatedRecord.officialDate = editForm.officialDate;
          updatedRecord.officialRedBalls = officialRed.sort((a, b) => a - b);
          updatedRecord.officialBlueBalls = officialBlue.sort((a, b) => a - b);
        }
      }
      
      onSave(updatedRecord);
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal edit-modal">
        <h3>编辑记录</h3>
        
        <div className="input-group">
          <label>记录日期:</label>
          <input
            type="date"
            value={editForm.date}
            onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
          />
        </div>
        
        <div className="input-group">
          <label>我的红球 (6个数字):</label>
          <input
            type="text"
            placeholder="例: 1,5,12,23,30,33"
            value={editForm.redBalls}
            onChange={(e) => setEditForm(prev => ({ ...prev, redBalls: e.target.value }))}
          />
        </div>
        
        <div className="input-group">
          <label>我的蓝球 (1个数字):</label>
          <input
            type="text"
            placeholder="例: 8"
            value={editForm.blueBalls}
            onChange={(e) => setEditForm(prev => ({ ...prev, blueBalls: e.target.value }))}
          />
        </div>
        
        <hr className="divider" />
        
        <div className="input-group">
          <label>官方开奖日期:</label>
          <input
            type="date"
            value={editForm.officialDate}
            onChange={(e) => setEditForm(prev => ({ ...prev, officialDate: e.target.value }))}
          />
        </div>
        
        <div className="input-group">
          <label>官方红球 (6个数字):</label>
          <input
            type="text"
            placeholder="例: 2,8,15,28,30,33"
            value={editForm.officialRedBalls}
            onChange={(e) => setEditForm(prev => ({ ...prev, officialRedBalls: e.target.value }))}
          />
        </div>
        
        <div className="input-group">
          <label>官方蓝球 (1个数字):</label>
          <input
            type="text"
            placeholder="例: 12"
            value={editForm.officialBlueBalls}
            onChange={(e) => setEditForm(prev => ({ ...prev, officialBlueBalls: e.target.value }))}
          />
        </div>
        
        <div className="modal-buttons">
          <button onClick={handleSave}>保存</button>
          <button onClick={onClose}>取消</button>
        </div>
      </div>
    </div>
  );
};

const ShuangSeQiuGame: React.FC = () => {
  const [availableRed, setAvailableRed] = useState(initialRedBalls);
  const [availableBlue, setAvailableBlue] = useState(initialBlueBalls);
  const [drawnRed, setDrawnRed] = useState<number[]>([]);
  const [drawnBlue, setDrawnBlue] = useState<number[]>([]);
  const [redBallsInContainer, setRedBallsInContainer] = useState<BallInContainer[]>([]);
  const [blueBallsInContainer, setBlueBallsInContainer] = useState<BallInContainer[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingBall, setAnimatingBall] = useState<AnimatingBall | null>(null);
  const [memorizedRecords, setMemorizedRecords] = useState<ShuangSeQiuRecord[]>([]);
  const [showMemoryDialog, setShowMemoryDialog] = useState(false);
  const [showRecordsManager, setShowRecordsManager] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [editingRecord, setEditingRecord] = useState<ShuangSeQiuRecord | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [gameMode, setGameMode] = useState<'draw' | 'manual'>('draw');
  const [selectedRed, setSelectedRed] = useState<number[]>([]);
  const [selectedBlue, setSelectedBlue] = useState<number[]>([]);
  const recordsPerPage = 5;

  // 加载本地存储的记录
  useEffect(() => {
    const saved = localStorage.getItem('shuangseqiu-memorized-records');
    if (saved) {
      setMemorizedRecords(JSON.parse(saved));
    }
  }, []);

  // 初始化球池容器
  const initializeBallContainers = useCallback(() => {
    // 初始化红球容器
    const redBalls = availableRed.map(number => ({
      number,
      type: 'red' as BallType,
      x: Math.random() * 280,
      y: Math.random() * 150,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      id: `red-${number}`
    }));
    setRedBallsInContainer(redBalls);

    // 初始化蓝球容器
    const blueBalls = availableBlue.map(number => ({
      number,
      type: 'blue' as BallType,
      x: Math.random() * 280,
      y: Math.random() * 150,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      id: `blue-${number}`
    }));
    setBlueBallsInContainer(blueBalls);
  }, [availableRed, availableBlue]);

  useEffect(() => {
    initializeBallContainers();
  }, [availableRed, availableBlue, initializeBallContainers]);

  // 启动球池动画
  const startBallAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2500);
  };

  // 球的物理动画
  useEffect(() => {
    if (!isAnimating) return;

    const animationInterval = setInterval(() => {
      setRedBallsInContainer(prev => 
        prev.map(ball => {
          let newX = ball.x + ball.vx * 3;
          let newY = ball.y + ball.vy * 3;
          let newVx = ball.vx;
          let newVy = ball.vy;

          if (newX <= 15 || newX >= 265) {
            newVx = -newVx;
            newX = Math.max(15, Math.min(265, newX));
          }
          if (newY <= 15 || newY >= 135) {
            newVy = -newVy;
            newY = Math.max(15, Math.min(135, newY));
          }

          return { ...ball, x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );

      setBlueBallsInContainer(prev => 
        prev.map(ball => {
          let newX = ball.x + ball.vx * 3;
          let newY = ball.y + ball.vy * 3;
          let newVx = ball.vx;
          let newVy = ball.vy;

          if (newX <= 15 || newX >= 265) {
            newVx = -newVx;
            newX = Math.max(15, Math.min(265, newX));
          }
          if (newY <= 15 || newY >= 135) {
            newVy = -newVy;
            newY = Math.max(15, Math.min(135, newY));
          }

          return { ...ball, x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );
    }, 16);

    return () => clearInterval(animationInterval);
  }, [isAnimating]);

  const handleDrawRedBall = () => {
    if (animatingBall || drawnRed.length >= 6 || redBallsInContainer.length === 0) return;
    const randomIndex = Math.floor(Math.random() * redBallsInContainer.length);
    const selectedBall = redBallsInContainer[randomIndex];
    
    setAnimatingBall({ number: selectedBall.number, type: 'red', id: selectedBall.id });
    startBallAnimation();
    
    setTimeout(() => {
      setDrawnRed(prev => [...prev, selectedBall.number].sort((a, b) => a - b));
      setAvailableRed(prev => prev.filter(num => num !== selectedBall.number));
      setRedBallsInContainer(prev => prev.filter(ball => ball.id !== selectedBall.id));
      setAnimatingBall(null);
    }, 2000);
  };

  const handleDrawBlueBall = () => {
    if (animatingBall || drawnBlue.length >= 1 || blueBallsInContainer.length === 0) return;
    const randomIndex = Math.floor(Math.random() * blueBallsInContainer.length);
    const selectedBall = blueBallsInContainer[randomIndex];
    
    setAnimatingBall({ number: selectedBall.number, type: 'blue', id: selectedBall.id });
    startBallAnimation();
    
    setTimeout(() => {
      setDrawnBlue(prev => [...prev, selectedBall.number].sort((a, b) => a - b));
      setAvailableBlue(prev => prev.filter(num => num !== selectedBall.number));
      setBlueBallsInContainer(prev => prev.filter(ball => ball.id !== selectedBall.id));
      setAnimatingBall(null);
    }, 2000);
  };

  const handleDrawAllRed = () => {
    if (animatingBall || drawnRed.length >= 6 || redBallsInContainer.length === 0) return;
    const remaining = Math.min(6 - drawnRed.length, redBallsInContainer.length);
    
    // 随机选择球而不是按顺序选择
    const shuffled = [...redBallsInContainer].sort(() => Math.random() - 0.5);
    const ballsToSelect = shuffled.slice(0, remaining);
    
    startBallAnimation();
    
    setTimeout(() => {
      const newNumbers = ballsToSelect.map(ball => ball.number).sort((a, b) => a - b);
      setDrawnRed(prev => [...prev, ...newNumbers].sort((a, b) => a - b));
      setAvailableRed(prev => prev.filter(num => !newNumbers.includes(num)));
      setRedBallsInContainer(prev => prev.filter(ball => !ballsToSelect.some(selected => selected.id === ball.id)));
    }, 2000);
  };

  const handleDrawAllBlue = () => {
    if (animatingBall || drawnBlue.length >= 1 || blueBallsInContainer.length === 0) return;
    const remaining = Math.min(1 - drawnBlue.length, blueBallsInContainer.length);
    
    // 随机选择球而不是按顺序选择
    const shuffled = [...blueBallsInContainer].sort(() => Math.random() - 0.5);
    const ballsToSelect = shuffled.slice(0, remaining);
    
    startBallAnimation();
    
    setTimeout(() => {
      const newNumbers = ballsToSelect.map(ball => ball.number).sort((a, b) => a - b);
      setDrawnBlue(prev => [...prev, ...newNumbers].sort((a, b) => a - b));
      setAvailableBlue(prev => prev.filter(num => !newNumbers.includes(num)));
      setBlueBallsInContainer(prev => prev.filter(ball => !ballsToSelect.some(selected => selected.id === ball.id)));
    }, 2000);
  };


  const handleMemorizeResult = () => {
    if (isDrawingFinished) {
      const newRecord: ShuangSeQiuRecord = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('zh-CN'),
        redBalls: [...drawnRed],
        blueBalls: [...drawnBlue],
        isMemorized: true
      };
      const updatedRecords = [...memorizedRecords, newRecord];
      setMemorizedRecords(updatedRecords);
      localStorage.setItem('shuangseqiu-memorized-records', JSON.stringify(updatedRecords));
      setShowMemoryDialog(false);
    }
  };

  const handleAddOfficialResult = (recordId: string, officialData: { date: string; redBalls: number[]; blueBalls: number[] }) => {
    const updatedRecords = memorizedRecords.map(record => 
      record.id === recordId 
        ? { 
            ...record, 
            officialDate: officialData.date,
            officialRedBalls: officialData.redBalls.sort((a, b) => a - b),
            officialBlueBalls: officialData.blueBalls.sort((a, b) => a - b)
          }
        : record
    );
    setMemorizedRecords(updatedRecords);
    localStorage.setItem('shuangseqiu-memorized-records', JSON.stringify(updatedRecords));
  };

  const handleEditRecord = (record: ShuangSeQiuRecord) => {
    setEditingRecord(record);
    setShowEditDialog(true);
  };

  const handleSaveEdit = (updatedRecord: ShuangSeQiuRecord) => {
    const updatedRecords = memorizedRecords.map(record => 
      record.id === updatedRecord.id ? updatedRecord : record
    );
    setMemorizedRecords(updatedRecords);
    localStorage.setItem('shuangseqiu-memorized-records', JSON.stringify(updatedRecords));
    setShowEditDialog(false);
    setEditingRecord(null);
  };

  const handleDeleteRecord = (recordId: string) => {
    const updatedRecords = memorizedRecords.filter(record => record.id !== recordId);
    setMemorizedRecords(updatedRecords);
    localStorage.setItem('shuangseqiu-memorized-records', JSON.stringify(updatedRecords));
    // 调整当前页码
    const totalPages = Math.ceil(updatedRecords.length / recordsPerPage);
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    }
  };

  const calculateMatches = (record: ShuangSeQiuRecord) => {
    if (!record.officialRedBalls || !record.officialBlueBalls) return null;
    
    const redMatches = record.redBalls.filter(ball => record.officialRedBalls!.includes(ball)).length;
    const blueMatches = record.blueBalls.filter(ball => record.officialBlueBalls!.includes(ball)).length;
    
    return { redMatches, blueMatches };
  };

  const isDrawingFinished = drawnRed.length >= 6 && drawnBlue.length >= 1;
  const isGameStarted = drawnRed.length > 0 || drawnBlue.length > 0;

  // 分页逻辑
  const totalPages = Math.ceil(memorizedRecords.length / recordsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleReset = () => {
    setAvailableRed(initialRedBalls);
    setAvailableBlue(initialBlueBalls);
    setDrawnRed([]);
    setDrawnBlue([]);
    setAnimatingBall(null);
    setSelectedRed([]);
    setSelectedBlue([]);
  };

  // 自选号码处理函数
  const handleRedBallSelect = (ball: number) => {
    if (selectedRed.includes(ball)) {
      setSelectedRed(selectedRed.filter(b => b !== ball));
    } else if (selectedRed.length < 6) {
      setSelectedRed([...selectedRed, ball].sort((a, b) => a - b));
    }
  };

  const handleBlueBallSelect = (ball: number) => {
    if (selectedBlue.includes(ball)) {
      setSelectedBlue(selectedBlue.filter(b => b !== ball));
    } else if (selectedBlue.length < 1) {
      setSelectedBlue([...selectedBlue, ball].sort((a, b) => a - b));
    }
  };

  const handleConfirmSelection = () => {
    if (selectedRed.length === 6 && selectedBlue.length === 1) {
      setDrawnRed([...selectedRed]);
      setDrawnBlue([...selectedBlue]);
    }
  };

  const handleClearSelection = () => {
    setSelectedRed([]);
    setSelectedBlue([]);
  };

  const isSelectionComplete = selectedRed.length === 6 && selectedBlue.length === 1;

  return (
    <div className="lotto-game-container">
      <h1>双色球 (6+1)</h1>
      
      {/* 游戏模式切换 */}
      <div className="mode-switch">
        <button 
          className={`mode-btn ${gameMode === 'draw' ? 'active' : ''}`}
          onClick={() => setGameMode('draw')}
        >
          🎰 摇奖模式
        </button>
        <button 
          className={`mode-btn ${gameMode === 'manual' ? 'active' : ''}`}
          onClick={() => setGameMode('manual')}
        >
          ✋ 自选模式
        </button>
      </div>

      {gameMode === 'draw' ? (
        // 摇奖模式
        <>
          {/* 球池容器 */}
          <div className="ball-containers">
            <div className="container-section">
              <h3>红球池</h3>
              <div className="ball-container red">
                {redBallsInContainer.map((ball) => (
                  <div
                    key={ball.id}
                    className={`ball-in-container red ${animatingBall?.id === ball.id ? 'selected' : ''}`}
                    style={{
                      left: `${ball.x}px`,
                      top: `${ball.y}px`,
                    }}
                  >
                    {ball.number}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="container-section">
              <h3>蓝球池</h3>
              <div className="ball-container blue">
                {blueBallsInContainer.map((ball) => (
                  <div
                    key={ball.id}
                    className={`ball-in-container blue ${animatingBall?.id === ball.id ? 'selected' : ''}`}
                    style={{
                      left: `${ball.x}px`,
                      top: `${ball.y}px`,
                    }}
                  >
                    {ball.number}
                  </div>
                ))}
              </div>
            </div>
          </div>
      
      <div className="draw-sections">
        <div className="red-section">
          <h3>红球区 ({drawnRed.length}/6)</h3>
          <div className="button-group">
            <button 
              className="draw-button red" 
              onClick={handleDrawRedBall} 
              disabled={drawnRed.length >= 6 || !!animatingBall || isAnimating}
            >
              摇一个红球
            </button>
            <button 
              className="draw-button red" 
              onClick={handleDrawAllRed} 
              disabled={drawnRed.length >= 6 || !!animatingBall || isAnimating}
            >
              摇完所有红球
            </button>
          </div>
        </div>
        
        <div className="blue-section">
          <h3>蓝球区 ({drawnBlue.length}/1)</h3>
          <div className="button-group">
            <button 
              className="draw-button blue" 
              onClick={handleDrawBlueBall} 
              disabled={drawnBlue.length >= 1 || !!animatingBall || isAnimating}
            >
              摇一个蓝球
            </button>
            <button 
              className="draw-button blue" 
              onClick={handleDrawAllBlue} 
              disabled={drawnBlue.length >= 1 || !!animatingBall || isAnimating}
            >
              摇完所有蓝球
            </button>
          </div>
        </div>
      </div>
      
      <div className="control-buttons">
        {isGameStarted && (
          <button className="reset-button" onClick={handleReset}>
            一键重置
          </button>
        )}
        {isDrawingFinished && (
          <>
            <button className="memory-button" onClick={() => setShowMemoryDialog(true)}>
              记忆此组号码
            </button>
            <button className="official-button" onClick={() => setShowRecordsManager(true)}>
              管理记录
            </button>
          </>
        )}
      </div>

      <div className="results-container">
        <div className="drawn-balls-container">
          <h3>红球区:</h3>
          <div className="balls-display">
            {drawnRed.map((ball) => (
              <div key={`red-${ball}`} className="ball red">
                {ball}
              </div>
            ))}
            {Array.from({ length: 6 - drawnRed.length }).map((_, i) => (
              <div key={`empty-red-${i}`} className="ball empty">?</div>
            ))}
          </div>
        </div>
        <div className="drawn-balls-container">
          <h3>蓝球区:</h3>
          <div className="balls-display">
            {drawnBlue.map((ball) => (
              <div key={`blue-${ball}`} className="ball blue">
                {ball}
              </div>
            ))}
            {Array.from({ length: 1 - drawnBlue.length }).map((_, i) => (
              <div key={`empty-blue-${i}`} className="ball empty">?</div>
            ))}
          </div>
        </div>
      </div>
      </>
      ) : (
        // 自选模式
        <>
          <div className="manual-selection">
            <div className="selection-section">
              <h3>选择红球 ({selectedRed.length}/6)</h3>
              <div className="balls-grid red-grid">
                {initialRedBalls.map((ball) => (
                  <button
                    key={ball}
                    className={`ball-btn red ${selectedRed.includes(ball) ? 'selected' : ''}`}
                    onClick={() => handleRedBallSelect(ball)}
                    disabled={!selectedRed.includes(ball) && selectedRed.length >= 6}
                  >
                    {ball}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="selection-section">
              <h3>选择蓝球 ({selectedBlue.length}/1)</h3>
              <div className="balls-grid blue-grid">
                {initialBlueBalls.map((ball) => (
                  <button
                    key={ball}
                    className={`ball-btn blue ${selectedBlue.includes(ball) ? 'selected' : ''}`}
                    onClick={() => handleBlueBallSelect(ball)}
                    disabled={!selectedBlue.includes(ball) && selectedBlue.length >= 1}
                  >
                    {ball}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="selection-controls">
              <button 
                className="confirm-btn" 
                onClick={handleConfirmSelection}
                disabled={!isSelectionComplete}
              >
                确认选号
              </button>
              <button 
                className="clear-btn" 
                onClick={handleClearSelection}
                disabled={selectedRed.length === 0 && selectedBlue.length === 0}
              >
                清空选择
              </button>
            </div>
          </div>
          
          <div className="results-container">
            <div className="drawn-balls-container">
              <h3>红球区:</h3>
              <div className="balls-display">
                {drawnRed.map((ball) => (
                  <div key={`red-${ball}`} className="ball red">
                    {ball}
                  </div>
                ))}
                {Array.from({ length: 6 - drawnRed.length }).map((_, i) => (
                  <div key={`empty-red-${i}`} className="ball empty">?</div>
                ))}
              </div>
            </div>
            <div className="drawn-balls-container">
              <h3>蓝球区:</h3>
              <div className="balls-display">
                {drawnBlue.map((ball) => (
                  <div key={`blue-${ball}`} className="ball blue">
                    {ball}
                  </div>
                ))}
                {Array.from({ length: 1 - drawnBlue.length }).map((_, i) => (
                  <div key={`empty-blue-${i}`} className="ball empty">?</div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="control-buttons">
            {isGameStarted && (
              <button className="reset-button" onClick={handleReset}>
                一键重置
              </button>
            )}
            {isDrawingFinished && (
              <>
                <button className="memory-button" onClick={() => setShowMemoryDialog(true)}>
                  记忆此组号码
                </button>
                <button className="official-button" onClick={() => setShowRecordsManager(true)}>
                  管理记录
                </button>
              </>
            )}
          </div>
        </>
      )}

      {memorizedRecords.length > 0 && (
        <div className="memorized-records">
          <div className="records-header">
            <h4>最近记录 ({memorizedRecords.length}条)</h4>
            <button className="manage-button" onClick={() => setShowRecordsManager(true)}>
              管理所有记录
            </button>
          </div>
          {memorizedRecords.slice(-3).map(record => {
            const matches = calculateMatches(record);
            return (
              <div key={record.id} className="record">
                <div className="record-info">
                  <span className="record-date">{record.date}: </span>
                  {record.redBalls.map(ball => (
                    <span key={ball} className="ball red tiny">{ball}</span>
                  ))}
                  {record.blueBalls.map(ball => (
                    <span key={ball} className="ball blue tiny">{ball}</span>
                  ))}
                  {matches && (
                    <span className="matches">({matches.redMatches}+{matches.blueMatches})</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showMemoryDialog && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>确认记忆此组号码？</h3>
            <p>红球: {drawnRed.join(', ')}</p>
            <p>蓝球: {drawnBlue.join(', ')}</p>
            <div className="modal-buttons">
              <button onClick={handleMemorizeResult}>确认</button>
              <button onClick={() => setShowMemoryDialog(false)}>取消</button>
            </div>
          </div>
        </div>
      )}

      {showRecordsManager && (
        <RecordsManager 
          records={memorizedRecords}
          currentPage={currentPage}
          recordsPerPage={recordsPerPage}
          totalPages={totalPages}
          onClose={() => setShowRecordsManager(false)}
          onEdit={handleEditRecord}
          onDelete={handleDeleteRecord}
          onAddOfficial={handleAddOfficialResult}
          onNextPage={nextPage}
          onPrevPage={prevPage}
          calculateMatches={calculateMatches}
        />
      )}

      {showEditDialog && editingRecord && (
        <EditRecordDialog 
          record={editingRecord}
          onSave={handleSaveEdit}
          onClose={() => {
            setShowEditDialog(false);
            setEditingRecord(null);
          }}
        />
      )}
    </div>
  );
};

export default ShuangSeQiuGame;
export type { ShuangSeQiuRecord };
