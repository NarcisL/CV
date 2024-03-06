%% Al doilea semnal
close all

t=Lascu(:,1);
u=Lascu(:,2);
y=Lascu(:,4);

plot(t,u,t,y);title('Semnalul de iesire suprapus pe semnalul de intrare dupa ce am introdus un zero in plus');grid on;
%%
Tr=2*(t(150)-t(140))
%identificare parametrica
data_id = iddata(y,u,Tr);
m_armax = armax(data_id,[2,2,4,1])
%gradul de suprapunere
grid on;figure; compare(data_id,m_armax); shg;title('Gradul de suprapunere folosind metoda ARMAX')
% validarea statistica
grid on;figure; resid(data_id,m_armax,'corr',9);title('Validare prin autocorelatie folosind metoda ARMAX')
Hd_armax = tf(m_armax.B,m_armax.A,Tr,'variable','z^-1')
%%
% identificare IV
m_iv = iv4(data_id,[2,2,1]);
grid on;figure; resid(m_iv,data_id);title('Validare prin intercorelatie folosind metoda IV')
grid on;figure; compare(m_iv,data_id);title('Gradul de suprapunere folosind metoda IV')
Hd_iv=tf(m_iv.B,m_iv.A,Tr,'variable','z^-1')

% identificare OE
m_oe=oe(data_id,[2 2 1]);
grid on;figure; resid(m_oe,data_id,9);title('Validare prin intercorelatie folosind metoda OE')
grid on;figure; compare(m_oe,data_id);title('Gradul de suprapunere folosind metoda OE')
Hd_oe=tf(m_oe.B,m_oe.F,Tr,'variable','z^-1')
%%
m_n4sid=n4sid(data_id,1:10)
idx=[30:330]
data2=iddata(y(idx,1),u(idx,1),Tr)
m_pem2=pem(data2,m_n4sid)

figure; compare(data2,m_pem2);title('Gradul de suprapunere dupa ce am filtrat semnalul folosind metoda n4sid respectiv pem');
figure; resid(data2,m_pem2);title('Validare prin intercorelatie')


