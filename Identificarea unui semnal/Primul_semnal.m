%% Primul semnal
close all

t=double(Lascu(:,1))
u=double(Lascu(:,2))
y=double(Lascu(:,3))

plot(t,u,t,y);grid on;title('Semnalul de iesire suprapus pe semnalul de intrare')

%%
k1u=20;
k1y=23;
k2u=992;
k2y=995;

k=mean(k1y:k2y)/mean(k1u:k2u)

ymax=186;
umax=182;
ymin=194;
umin=190;

dt=t(ymax)-t(umax)
Tn=2*(t(umin)-t(umax))
wn=2*pi/Tn
ph=dt*wn
m1=(y(ymax)-y(ymin))/(u(umax)-u(umin))/k
defazaj=rad2deg(ph)
tita=k/m1/2 

H=tf(k*wn^2,[1 2*tita*wn wn^2])
%figure;nyquist(H);
 
A=[0,1;-wn^2,-2*tita*wn];
B=[0;k*wn^2];
C=[1,0];
D=0;
sys=ss(A,B,C,D);
ysim=lsim(sys,u,t,[y(1),(y(2)-y(1))/(t(2)-t(1))]); %+2*tita*wn*y(1) 
figure;plot(t,[y,ysim]); grid on;title('Semnalul identificat prin metoda defasajului suprapus peste semnalul masurat')

J=norm(y-ysim)/sqrt(length(y))
Empn=norm(y-ysim)/norm(y-mean(y))
%%
%identificare prin metode parametrice

Tr=(t(131)-t(120))/2;

% identificare cu ARMAX
data_id = iddata(y,u,Tr);
m_armax = armax(data_id,[2,1,2,1])
%gradul de suprapunere
grid on;figure; compare(data_id,m_armax); shg;title('Gradul de suprapunere folosind metoda ARMAX')
% validarea statistica
grid on;figure; resid(data_id,m_armax,'corr',5);title('Validare prin autocorelatie')
Hd_armax = tf(m_armax.B,m_armax.A,Tr,'variable','z^-1')

% % identificare IV
% m_iv = iv4(data_id,[2,1,1]);
% % validarea statistica
% grid on;figure; resid(m_iv,data_id,10);title('Validare prin intercorelatie')
% % gradul de suprapunere
% grid on;figure; compare(m_iv,data_id);title('Gradul de suprapunere folosind metoda IV')
% Hd_iv=tf(m_iv.B,m_iv.A,Tr,'variable','z^-1')

%identificare prin OE
m_oe=oe(data_id,[1 2 1]);
grid on;figure; resid(m_oe,data_id);title('Validare prin intercorelatie')
grid on;figure; compare(m_oe,data_id);title('Gradul de suprapunere folosind metoda OE')
Hd_oe=tf(m_oe.B,m_oe.F,Tr,'variable','z^-1')


