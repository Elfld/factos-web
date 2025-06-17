// src/components/chat/MessageBubble.js
'use client'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function MessageBubble({ message, onCaseClick }) {
  const [copied, setCopied] = useState(false)

  // 메시지 복사
  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('복사 실패:', err)
    }
  }

  // 판례 버튼 클릭
  const handleCaseClick = (caseItem) => {
    onCaseClick?.(caseItem)
  }

  if (message.isUser) {
    // 사용자 메시지
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
        <div style={{
          maxWidth: '320px',
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '12px 16px',
          borderRadius: '16px',
          borderBottomRightRadius: '4px',
          boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)'
        }}>
          <p style={{ 
            fontSize: '14px', 
            lineHeight: '1.5', 
            whiteSpace: 'pre-wrap',
            margin: '0'
          }}>
            {message.text}
          </p>
        </div>
      </div>
    )
  }

  // AI 응답 (블로그 스타일)
  return (
  <div className="group" style={{ position: 'relative', marginBottom: '32px' }}>
    <div style={{
      color: message.isError ? '#ef4444' : '#1f2937',                    // ← 에러면 빨간색
      lineHeight: '1.7',
      whiteSpace: 'pre-wrap',
      marginBottom: '16px',
      fontSize: '15px',
      padding: message.isError ? '12px' : '0',                          // ← 에러면 패딩 추가
      backgroundColor: message.isError ? '#fef2f2' : 'transparent',     // ← 에러면 연한 빨간 배경
      borderRadius: message.isError ? '8px' : '0',                      // ← 에러면 둥근 모서리
      border: message.isError ? '1px solid #fecaca' : 'none'           // ← 에러면 테두리
    }}>
      {message.text}
    </div>
      
      {/* 하단 버튼 영역 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '8px'
      }}>
        {/* 왼쪽: 판례 버튼들 */}
        <div style={{ 
          display: 'flex', 
          gap: '6px', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {/* 판례가 있을 때만 "판례 참조:" 텍스트와 버튼들 표시 */}
          {message.casesSummaryList && message.casesSummaryList.length > 0 && (
            <>
              <span style={{ 
                fontSize: '12px', 
                color: '#6b7280', 
                fontWeight: '500',
                marginRight: '4px'
              }}>
                판례 참조:
              </span>
              {message.casesSummaryList.map((caseItem, index) => (
                <button
                  key={index}
                  onClick={() => handleCaseClick(caseItem)}
                  style={{
                    fontSize: '11px',
                    padding: '4px 8px',
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontWeight: '500',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb'
                    e.target.style.color = '#374151'
                    e.target.style.borderColor = '#d1d5db'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f3f4f6'
                    e.target.style.color = '#6b7280'
                    e.target.style.borderColor = '#e5e7eb'
                  }}
                >
                  {caseItem.caseNumber}
                </button>
              ))}
            </>
          )}
        </div>

        {/* 오른쪽: 복사 버튼 */}
        <div>
          <button
            onClick={copyMessage}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              color: '#6b7280',
              backgroundColor: 'transparent',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e7eb'
              e.currentTarget.style.color = '#374151'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#6b7280'
            }}
          >
            {copied ? (
              <>
                <Check style={{ width: '12px', height: '12px' }} />
                <span>복사됨</span>
              </>
            ) : (
              <>
                <Copy style={{ width: '12px', height: '12px' }} />
                <span>복사</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* CSS for hover effect */}
      <style jsx>{`
        .group:hover .group-hover\\:opacity-100 {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  )
}