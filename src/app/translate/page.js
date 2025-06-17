// src/app/translate/page.js - 용어 변환 페이지 (API 응답 구조 수정)
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Home, Scale, BookOpen, ArrowRight, Sparkles } from 'lucide-react'
import { translateLegalTerm } from '@/lib/api'

export default function TranslatePage() {
  const [searchTerm, setSearchTerm] = useState('')        // 검색창 입력용
  const [searchedTerm, setSearchedTerm] = useState('')    // 결과 표시용 (고정)
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = '법률 용어 변환 - Factos'
  }, [])

  // 검색 실행
  const handleSearch = async () => {
    if (!searchTerm.trim()) return
    
    setIsLoading(true)
    setError(null)
    setResult(null)
    setSearchedTerm(searchTerm.trim())  // 검색한 용어 고정

    try {
      const response = await translateLegalTerm(searchTerm.trim())
      
      if (response.success) {
        setResult(response.data)
      } else {
        setError(response.error || '용어 변환에 실패했습니다.')
      }
    } catch (err) {
      setError('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  // Enter 키 처리
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // 예시 용어 클릭
  const handleExampleClick = (term) => {
    setSearchTerm(term)
  }

  return (
    <div style={{
      height: '100vh',                    // min-height → height로 변경
      background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #e5e7eb 100%)',
      position: 'relative',
      overflowY: 'auto',                  // 세로 스크롤 활성화
      overflowX: 'hidden'                 // 가로 스크롤 숨김
    }}>
      {/* 홈 버튼 - 우측 상단 */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: '10'
      }}>
        <Link href="/">
          <button
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              border: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#2563eb'
              e.target.style.transform = 'scale(1.05)'
              e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#3b82f6'
              e.target.style.transform = 'scale(1)'
              e.target.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)'
            }}
          >
            <Home style={{ width: '20px', height: '20px' }} />
          </button>
        </Link>
      </div>

      <div 
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: result || error ? 'flex-start' : 'center',
          minHeight: '100vh',                                              // 콘텐츠 최소 높이 유지
          padding: result || error ? '40px 20px 80px' : '40px 20px',
          paddingTop: result || error ? '80px' : '40px',
          maxWidth: '1000px',
          margin: '0 auto',
          transition: 'all 0.5s ease',
          width: '100%',                                                   // 전체 너비 사용
          boxSizing: 'border-box'                                          // 패딩 포함 크기 계산
        }}
      >

        {/* 상단 헤더 */}
        <div style={{
          textAlign: 'center',
          marginBottom: result || error ? '40px' : '60px'
        }}>
          {/* 로고 + 제목 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <BookOpen style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
            </div>
            
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0'
            }}>
              법률 용어 변환
            </h1>
          </div>

          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            margin: '0',
            maxWidth: '600px'
          }}>
            어려운 법률 용어를 쉬운 일상 언어로 변환해드립니다
          </p>
        </div>

        {/* 거대한 검색 바 */}
        <div style={{
          width: '100%',
          maxWidth: '700px',
          marginBottom: result || error ? '24px' : '40px'
        }}>
          <div style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '50px',
            border: '2px solid #e5e7eb',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            overflow: 'hidden'
          }}
          onFocus={() => {
            const container = document.querySelector('.search-container')
            if (container) {
              container.style.borderColor = '#3b82f6'
              container.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1), 0 8px 30px rgba(0, 0, 0, 0.12)'
            }
          }}
          onBlur={() => {
            const container = document.querySelector('.search-container')
            if (container) {
              container.style.borderColor = '#e5e7eb'
              container.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
            }
          }}
          className="search-container"
          >
            {/* 검색 아이콘 */}
            <div style={{
              position: 'absolute',
              left: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: '2'
            }}>
              <Search style={{ width: '24px', height: '24px', color: '#6b7280' }} />
            </div>

            {/* 검색 입력 필드 */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="법률 용어를 입력하세요 (예: 민법상 불법행위)"
              style={{
                width: '100%',
                height: '70px',
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                fontSize: '18px',
                padding: '0 140px 0 60px',
                color: '#111827',
                fontFamily: 'inherit'
              }}
              disabled={isLoading}
            />

            {/* 검색 버튼 */}
            <button
              onClick={handleSearch}
              disabled={!searchTerm.trim() || isLoading}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                height: '54px',
                padding: '0 24px',
                background: searchTerm.trim() && !isLoading ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : '#d1d5db',
                color: 'white',
                border: 'none',
                borderRadius: '27px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: searchTerm.trim() && !isLoading ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: '2'
              }}
              onMouseEnter={(e) => {
                if (searchTerm.trim() && !isLoading) {
                  e.target.style.background = 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                  e.target.style.transform = 'translateY(-50%) scale(1.02)'
                }
              }}
              onMouseLeave={(e) => {
                if (searchTerm.trim() && !isLoading) {
                  e.target.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                  e.target.style.transform = 'translateY(-50%) scale(1)'
                }
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  변환 중
                </>
              ) : (
                <>
                  변환하기
                  <ArrowRight style={{ width: '16px', height: '16px' }} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* 결과 영역 */}
        {(result || error) && (
          <div style={{
            width: '100%',
            maxWidth: '700px',
            marginBottom: '40px'
          }}>
            {error ? (
              <div style={{
                background: 'linear-gradient(135deg, #fef2f2 0%, #fce7e7 100%)',
                border: '1px solid #fecaca',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center'
              }}>
                <p style={{
                  color: '#ef4444',
                  fontSize: '16px',
                  margin: '0',
                  fontWeight: '500'
                }}>
                  {error}
                </p>
              </div>
            ) : (
              <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                padding: '32px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Sparkles style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
                  </div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#111827',
                    margin: '0'
                  }}>
                    💡 쉽게 풀어드릴게요
                  </h3>
                </div>
                
                <div style={{
                  marginBottom: '16px'
                }}>
                  <div style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    marginBottom: '12px'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1e40af'
                    }}>
                      📖 "{searchedTerm}"
                    </span>
                  </div>
                </div>
                
                <div style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e2e8f0'
                }}>
                  {typeof result === 'string' ? (
                    <p style={{
                      fontSize: '16px',
                      color: '#374151',
                      lineHeight: '1.7',
                      margin: '0',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {result}
                    </p>
                  ) : result && typeof result === 'object' ? (
                    <div>
                      {/* Claude 응답 표시 (새로운 구조) */}
                      {result.claudeResponse ? (
                        <div style={{ marginBottom: '16px' }}>
                          <h4 style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#6b7280',
                            margin: '0 0 8px 0',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            설명
                          </h4>
                          <p style={{
                            fontSize: '16px',
                            color: '#374151',
                            lineHeight: '1.7',
                            margin: '0',
                            whiteSpace: 'pre-wrap'
                          }}>
                            {result.claudeResponse}
                          </p>
                        </div>
                      ) : (
                        // 기존 구조 (generalTerms, context) - 백워드 호환성
                        <>
                          {/* 일반 용어들 표시 */}
                          {result.generalTerms && Array.isArray(result.generalTerms) && result.generalTerms.length > 0 && (
                            <div style={{ marginBottom: '16px' }}>
                              <h4 style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#6b7280',
                                margin: '0 0 8px 0',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                              }}>
                                쉬운 용어
                              </h4>
                              <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '8px'
                              }}>
                                {result.generalTerms.map((term, index) => (
                                  <span
                                    key={index}
                                    style={{
                                      display: 'inline-block',
                                      backgroundColor: '#e0f2fe',
                                      color: '#0369a1',
                                      padding: '6px 12px',
                                      borderRadius: '20px',
                                      fontSize: '14px',
                                      fontWeight: '500'
                                    }}
                                  >
                                    {term}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* 컨텍스트 표시 (있을 경우) */}
                          {result.context && (
                            <div>
                              <h4 style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#6b7280',
                                margin: '0 0 8px 0',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                              }}>
                                추가 정보
                              </h4>
                              <p style={{
                                fontSize: '16px',
                                color: '#374151',
                                lineHeight: '1.7',
                                margin: '0',
                                fontStyle: 'italic'
                              }}>
                                {result.context}
                              </p>
                            </div>
                          )}
                        </>
                      )}
                      
                      {/* 모든 필드가 없거나 빈 경우 */}
                      {!result.claudeResponse && (!result.generalTerms || result.generalTerms.length === 0) && !result.context && (
                        <p style={{
                          fontSize: '16px',
                          color: '#6b7280',
                          margin: '0',
                          fontStyle: 'italic'
                        }}>
                          변환 결과를 표시할 수 없습니다.
                        </p>
                      )}
                    </div>
                  ) : (
                    <p style={{
                      fontSize: '16px',
                      color: '#6b7280',
                      margin: '0',
                      fontStyle: 'italic'
                    }}>
                      결과를 표시할 수 없습니다.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 하단 설명 (결과가 없을 때만 표시) */}
        {!result && !error && (
          <div style={{
            textAlign: 'center',
            maxWidth: '900px',
            marginTop: '60px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '32px'
            }}>
              Factos 용어 변환 서비스
            </h3>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              flexWrap: 'wrap'
            }}>
              <div style={{ 
                textAlign: 'center',
                maxWidth: '200px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <Search style={{ width: '24px', height: '24px', color: '#3b82f6' }} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
                  간편한 검색
                </h4>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0', lineHeight: '1.5' }}>
                  복잡한 법률 용어를 검색창에 입력하기만 하면 됩니다
                </p>
              </div>

              <div style={{ 
                textAlign: 'center',
                maxWidth: '200px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <BookOpen style={{ width: '24px', height: '24px', color: '#111827' }} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
                  쉬운 설명
                </h4>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0', lineHeight: '1.5' }}>
                  전문 용어를 누구나 이해할 수 있는 일상 언어로 설명합니다
                </p>
              </div>

              <div style={{ 
                textAlign: 'center',
                maxWidth: '200px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <Scale style={{ width: '24px', height: '24px', color: '#d97706' }} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
                  정확한 해석
                </h4>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0', lineHeight: '1.5' }}>
                  법률 전문가 수준의 정확하고 신뢰할 수 있는 해석을 제공합니다
                </p>
              </div>
            </div>
          </div>
        )}
              </div>

      {/* CSS 애니메이션 + 반응형 스크롤 대응 */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* 화면 배율 변경 및 작은 화면 대응 */
        @media (max-height: 800px) {
          .container {
            padding: 20px 16px 40px 16px !important;
            padding-top: 60px !important;
          }
        }

        @media (max-height: 600px) {
          .container {
            padding: 15px 12px 30px 12px !important;
            padding-top: 40px !important;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 30px 16px 50px 16px !important;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 20px 12px 40px 12px !important;
          }
        }
      `}</style>
    </div>
  )
}