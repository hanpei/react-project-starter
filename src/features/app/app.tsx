import { AppRouter } from './router';
import { AppProvider } from './provider';

/**
 * 应用入口
 * 全局Provider配置
 */
function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
