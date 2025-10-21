export const Footer = ({}) => {
  return (
    <div className="sticky bottom-0 z-50 max-w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="border-t border-input bg-card px-3 py-1 text-sm">
        <div className="flex items-center justify-between">
          <p>
            <span className="font-medium text-primary">action medeor </span>{" "}
            International Healthcare Tanzania
          </p>
          <span>
            {" "}
            &copy;{new Date().getFullYear()}{" "}
            <a className="text-muted-foreground">Terms of Use</a>{" "}
            <a className="text-muted-foreground">Privacy Policy</a>{" "}
            <span className="text-primary">v1.0.0-alpha1.0</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
