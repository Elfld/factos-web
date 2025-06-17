// src/components/chat/UserProfile.js
'use client'
import { useState, useRef, useEffect } from 'react'
import { User, Settings, MoreVertical } from 'lucide-react'

export default function UserProfile({ 
  displayText = "사용자", 
  backgroundColor = "#3b82f6",
  hoverBackgroundColor = "#2563eb",
  userName = "사용자",
  userEmail = "user@example.com"
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // 외부 클릭시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const menuItems = [
    {
      icon: Settings,
      label: '설정',
      onClick: () => {
        console.log('설정 클릭')
        setIsOpen(false)
      }
    },
    {
      icon: MoreVertical,
      label: '더보기',
      onClick: () => {
        console.log('더보기 클릭')
        setIsOpen(false)
      }
    }
  ]

  return (
    <div style={{ 
      position: 'relative'
    }} ref={dropdownRef}>
      {/* 유저 프로필 버튼 - props로 받은 값들 사용 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: backgroundColor,
          border: 'none',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: `0 2px 8px ${backgroundColor}4D`, // 투명도 30%
          fontSize: '14px',
          fontWeight: '600'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = hoverBackgroundColor
          e.target.style.transform = 'scale(1.05)'
          e.target.style.boxShadow = `0 4px 12px ${backgroundColor}66` // 투명도 40%
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = backgroundColor
          e.target.style.transform = 'scale(1)'
          e.target.style.boxShadow = `0 2px 8px ${backgroundColor}4D`
        }}
      >
        {displayText}
      </button>

      {/* 유저 드롭다운 메뉴 */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          right: '0',
          top: '48px',
          width: '224px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #e5e7eb',
          padding: '8px 0',
          zIndex: '50',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* 드롭다운 내 프로필도 props 사용 */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: backgroundColor,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {displayText}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{userName}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{userEmail}</div>
              </div>
            </div>
          </div>
          
          <div style={{ padding: '4px 0' }}>
            {menuItems.map((item, index) => (
              <button 
                key={index}
                onClick={item.onClick}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  fontSize: '14px',
                  color: '#374151',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <item.icon style={{ width: '16px', height: '16px', marginRight: '12px' }} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CSS 애니메이션 */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}