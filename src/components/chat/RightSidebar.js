// src/components/chat/RightSidebar.js
'use client'
import { useState, useRef, useEffect } from 'react'
import { X, Scale, FileText } from 'lucide-react'

export default function RightSidebar({
  isOpen,
  onClose,
  selectedCase
}) {
  const [sidebarWidth, setSidebarWidth] = useState(500) // 초기 폭
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef(null)

  // 최소/최대 폭 제한
  const MIN_WIDTH = 300
  const MAX_WIDTH = 800

  // 마우스 다운 - 리사이징 시작
  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsResizing(true)
  }

  // 마우스 무브 - 리사이징 중
  const handleMouseMove = (e) => {
    if (!isResizing) return

    const containerRect = document.querySelector('[data-chat-container]')?.getBoundingClientRect()
    if (!containerRect) return

    const newWidth = containerRect.right - e.clientX
    const clampedWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth))
    setSidebarWidth(clampedWidth)
  }

  // 마우스 업 - 리사이징 종료
  const handleMouseUp = () => {
    setIsResizing(false)
  }

  // 마우스 이벤트 리스너 등록/해제
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      // 드래그 중 텍스트 선택 방지
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'col-resize'
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      
      // 원래 상태로 복원
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }
  }, [isResizing])

  return (
    <div style={{
      width: isOpen ? `${sidebarWidth}px` : '0px',
      transition: isResizing ? 'none' : 'width 0.3s ease', // 드래그 중에는 애니메이션 끄기
      position: 'relative',
      zIndex: '40',
      height: '100vh',
      overflow: 'hidden'
    }}>
      {/* 리사이즈 핸들 - 왼쪽 경계 */}
      {isOpen && (
        <div
          onMouseDown={handleMouseDown}
          style={{
            position: 'absolute',
            left: '0',
            top: '0',
            width: '4px',
            height: '100%',
            backgroundColor: isResizing ? '#3b82f6' : 'transparent',
            cursor: 'col-resize',
            zIndex: '50',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!isResizing) {
              e.target.style.backgroundColor = '#e2e8f0'
            }
          }}
          onMouseLeave={(e) => {
            if (!isResizing) {
              e.target.style.backgroundColor = 'transparent'
            }
          }}
        />
      )}

      {/* 사이드바 내용물 */}
      <div 
        ref={sidebarRef}
        style={{
          width: `${sidebarWidth}px`,
          height: '100vh',
          backgroundColor: '#f8fafc',
          borderLeft: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        
        {/* 헤더 */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: 'white',
          position: 'relative',
          minHeight: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#dbeafe',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Scale style={{ width: '18px', height: '18px', color: '#3b82f6' }} />
            </div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0'
            }}>
              판례 상세정보
            </h2>
          </div>
          
          {/* X 버튼 - 우상단 */}
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              color: '#6b7280'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <X style={{ width: '18px', height: '18px' }} />
          </button>
        </div>

        {/* 내용 영역 */}
        <div style={{
          flex: '1',
          overflowY: 'auto',
          padding: '20px'
        }}>
          {selectedCase ? (
            <div>
              {/* 판례 번호 */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <FileText style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>판례 번호</span>
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: '0'
                }}>
                  {selectedCase.caseNumber}
                </h3>
              </div>

              {/* 판례 요약 */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #e2e8f0'
              }}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  margin: '0 0 16px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  판례 요약
                </h4>
                <div style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#4b5563',
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedCase.summary}
                </div>
              </div>
            </div>
          ) : (
            // 선택된 판례가 없을 때
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              color: '#6b7280'
            }}>
              <Scale style={{ width: '48px', height: '48px', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 8px 0' }}>
                판례를 선택해주세요
              </h3>
              <p style={{ fontSize: '14px', margin: '0', maxWidth: '300px' }}>
                AI 응답 하단의 판례 번호 버튼을 클릭하면 상세 정보를 확인할 수 있습니다.
              </p>
            </div>
          )}
        </div>

        {/* 하단 상태바 - 사이드바 폭 표시 */}
        <div style={{
          padding: '8px 16px',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#f1f5f9',
          fontSize: '11px',
          color: '#64748b',
          textAlign: 'center'
        }}>
          너비: {sidebarWidth}px
        </div>
      </div>
    </div>
  )
}