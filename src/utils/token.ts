//
import * as jose from 'jose';

export function createToken(profile: any) {
  const unsecuredJwt = new jose.UnsecuredJWT(profile)
    .setIssuedAt()
    .setIssuer('trilk:user:issuer')
    .setAudience('trilk:user:audience')
    .encode();

  localStorage.setItem('token', unsecuredJwt);
}

export function parseToken(): any {
  const token = localStorage.getItem('token') || '';

  const profile = token
    ? jose.UnsecuredJWT.decode(token, {
        issuer: 'trilk:user:issuer',
        audience: 'trilk:user:audience',
      }) || null
    : null;

  return profile !== null
    ? {
        userId: profile.payload?.userId || '',
        username: profile.payload?.username || '',
        displayName: profile.payload?.displayName || '',
        role: profile.payload?.role || '',
        avatar: profile?.payload.avatar || '',
      }
    : {};
}
