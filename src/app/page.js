// src/app/page.js - UserProfile 추가
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageCircle, ArrowRight, Scale, BookOpen, Sparkles } from 'lucide-react'
import UserProfile from '@/components/chat/UserProfile'
import { USER_PROFILE } from '@/lib/constants'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    document.title = 'Factos - 법률 AI 어시스턴트' // 추가
    setMounted(true)
  }, [])

  if (!mounted) return null

  // ===== 카드 데이터 + 간격 설정 =====
  const cardSettings = {
    height: '360px',
    paddingVertical: '40px',
    paddingHorizontal: '32px',
    textMargin: '55px',
    gap: '32px',
    // 상대 위치 설정 (카드 내 절대 위치)
    iconTop: '40px',
    iconLeft: '32px',
    titleTop: '128px',
    titleLeft: '32px',
    textTop: '168px',
    textLeft: '32px',
    textRight: '32px',
    buttonBottom: '32px',
    buttonLeft: '32px',
    buttonRight: '32px'
  }

  const cardData = [
    {
      id: 'chat',
      icon: <MessageCircle style={{ width: '32px', height: '32px', color: '#3b82f6' }} />,
      iconBg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
      title: 'AI 법률 상담',
      text: '복잡한 법률 문제를 AI와 실시간으로 상담하세요. 판례 기반의 정확한 답변을 즉시 받아볼 수 있습니다.',
      href: '/chat',
      buttonText: '채팅 시작하기',
      buttonBg: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
      buttonHover: 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)'
    },
    {
      id: 'translate',
      icon: <BookOpen style={{ width: '32px', height: '32px', color: '#111827' }} />,
      iconBg: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      title: '법률 용어 변환',
      text: '어려운 법률 용어를 쉬운 일상 언어로 번역해드립니다. 복잡한 계약서나 법문서를 이해하기 쉽게 만들어보세요.',
      href: '/translate',
      buttonText: '용어 변환하기',
      buttonBg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      buttonHover: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
    }
  ]

  return (
    <div className="homepage-container">
      {/* UserProfile - 우상단 */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: '10'
      }}>
        <UserProfile {...USER_PROFILE} />
      </div>

      <div className="homepage-content">
        
        {/* Hero 섹션 */}
        <div className="hero-section">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(17, 24, 39, 0.3)',
              position: 'relative'
            }}>
              <Scale style={{ width: '36px', height: '36px', color: '#f59e0b' }} />
              <div style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '24px',
                height: '24px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles style={{ width: '12px', height: '12px', color: 'white' }} />
              </div>
            </div>
            
            <h1 className="hero-title">Factos</h1>
          </div>
          
          <p style={{ fontSize: '24px', color: '#6b7280', margin: '0 0 16px 0', fontWeight: '400' }}>
            법률 AI 어시스턴트
          </p>
          
          <p style={{ fontSize: '18px', color: '#6b7280', margin: '0 auto', maxWidth: '600px', lineHeight: '1.6' }}>
            복잡한 법률 용어부터 전문적인 상담까지, 
            <br />Factos와 함께 법률을 쉽고 정확하게 이해하세요.
          </p>
        </div>

        {/* 카드 섹션 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: cardSettings.gap,
          width: '100%',
          maxWidth: '900px'
        }}>
          {cardData.map((card) => (
            <div 
              key={card.id}
              className="feature-card"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease',
                position: 'relative',  // ← relative로 변경 (절대 위치 기준점)
                height: cardSettings.height,
                minHeight: cardSettings.height
              }}
            >
              {/* 아이콘 - 절대 위치 */}
              <div style={{
                position: 'absolute',
                top: cardSettings.iconTop,
                left: cardSettings.iconLeft,
                width: '64px',
                height: '64px',
                background: card.iconBg,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {card.icon}
              </div>
              
              {/* 제목 - 절대 위치 */}
              <h3 style={{ 
                position: 'absolute',
                top: cardSettings.titleTop,
                left: cardSettings.titleLeft,
                right: cardSettings.titleLeft,  // 좌우 동일한 여백
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#111827', 
                margin: '0'
              }}>
                {card.title}
              </h3>
              
              {/* 텍스트 - 절대 위치 */}
              <p style={{ 
                position: 'absolute',
                top: cardSettings.textTop,
                left: cardSettings.textLeft,
                right: cardSettings.textRight,
                fontSize: '16px', 
                color: '#6b7280', 
                margin: '0',
                lineHeight: '1.6'
              }}>
                {card.text}
              </p>
              
              {/* 버튼 - 절대 위치 */}
              <Link href={card.href} style={{ 
                position: 'absolute',
                bottom: cardSettings.buttonBottom,
                left: cardSettings.buttonLeft,
                right: cardSettings.buttonRight,
                textDecoration: 'none' 
              }}>
                <button 
                  className={`card-button card-button--${card.id}`}
                  style={{
                    width: '100%',
                    background: card.buttonBg,
                    color: 'white',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                    height: '56px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = card.buttonHover
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = card.buttonBg
                  }}
                >
                  {card.buttonText}
                  <ArrowRight style={{ width: '20px', height: '20px' }} />
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* 하단 정보 */}
        <div style={{
          marginTop: '80px',
          textAlign: 'center',
          paddingBottom: '40px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <Scale style={{ width: '16px', height: '16px', color: '#f59e0b' }} />
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0', fontWeight: '500' }}>
              Factos v0.1 Beta
            </p>
          </div>
          
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0' }}>
            무료로 시작하세요 • 계정 등록이 필요하지 않습니다
          </p>
        </div>
      </div>

      {/* CSS - 크기 효과만 */}
      <style jsx>{`
        .homepage-container {
          height: 100vh;
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #e5e7eb 100%);
          overflow-y: auto;
          overflow-x: hidden;
        }

        .homepage-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 16px 60px 16px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 80px;
        }

        .hero-title {
          font-size: 56px;
          font-weight: 700;
          background: linear-gradient(135deg, #111827 0%, #374151 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          line-height: 1.1;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        /* 버튼 크기 효과만 - 색상은 JavaScript에서 처리 */
        .card-button:hover {
          transform: scale(1.02);
        }

        @media (max-height: 800px) {
          .hero-section { margin-bottom: 40px; }
          .hero-title { font-size: 42px; }
          .homepage-content { padding: 20px 16px 40px 16px; }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 42px; }
          .homepage-content { padding: 30px 16px 50px 16px; }
        }

        @media (max-width: 480px) {
          .homepage-content { padding: 20px 12px 40px 12px; }
          .hero-title { font-size: 36px; }
        }

        @media (max-height: 600px) {
          .homepage-content { padding: 15px 12px 30px 12px; }
          .hero-section { margin-bottom: 20px; }
        }
      `}</style>
    </div>
  )
}