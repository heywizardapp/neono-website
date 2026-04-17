import { useBreakpoint } from "./shared";
import DesktopCalendar from "./DesktopCalendar";
import MobileCalendar from "./MobileCalendar";

export function InteractiveCalendar() {
  const isMobile = useBreakpoint();
  return isMobile ? <MobileCalendar /> : <DesktopCalendar />;
}

export default InteractiveCalendar;
